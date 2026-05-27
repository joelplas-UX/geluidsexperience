/* ============================================================
   Geluidsexperience — Premium Redesign Interactions
   ============================================================ */

/* ---------- Portfolio media (photos only) ---------- */
const PORTFOLIO = [
  { src: "media/IMG_2419.jpeg", label: "Live op het podium",       meta: "Front-of-house" },
  { src: "media/IMG_0501.jpeg", label: "Opbouw bij daglicht",      meta: "Stage prep" },
  { src: "media/IMG_0746.jpeg", label: "Volledige PA in positie",  meta: "Soundcheck" },
  { src: "media/IMG_4461.jpeg", label: "Op het podium",            meta: "Band setup" },
  { src: "media/IMG_3901.jpeg", label: "In het publiek",           meta: "Live show" },
  { src: "media/IMG_7446.jpeg", label: "Licht in scène",           meta: "Lichtdesign" },
  { src: "media/IMG_3902.jpeg", label: "Volle bak",                meta: "Live concert" },
  { src: "media/photo_5B85.jpg", label: "Achter de knoppen",       meta: "FOH mix" },
  { src: "media/IMG_0841.jpeg", label: "Zicht vanaf de zijkant",   meta: "Stage view" },
  { src: "media/IMG_0549.jpeg", label: "Voor de show",             meta: "Opbouw" },
  { src: "media/photo_D646.jpg", label: "Intieme set",             meta: "Akoestisch" },
  { src: "media/IMG_0440.jpeg", label: "Avondset",                 meta: "Mix positie" },
  { src: "media/IMG_2924.jpeg", label: "Speakerstack",             meta: "Outdoor PA" },
  { src: "media/IMG_5701.jpeg", label: "Show opener",              meta: "Licht & geluid" },
];

const frame = document.getElementById("carouselFrame");
const thumbs = document.getElementById("carouselThumbs");
const overlayLabel = document.getElementById("slideLabel");
const overlayMeta = document.getElementById("slideMeta");
const typeBadge = document.getElementById("slideTypeBadge");
const counterCurrent = document.getElementById("counterCurrent");
const counterTotal = document.getElementById("counterTotal");
const progressBar = document.getElementById("progressBar");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentIdx = 0;
let advanceTimer = null;
const ADVANCE_MS = 6500;

/* --------- build slides --------- */
PORTFOLIO.forEach((item, i) => {
  const slide = document.createElement("div");
  slide.className = "carousel-slide";
  slide.dataset.index = i;

  // blurred backdrop layer (same image, blurred + darkened)
  const backdrop = document.createElement("img");
  backdrop.className = "backdrop";
  backdrop.src = item.src;
  backdrop.alt = "";
  backdrop.setAttribute("aria-hidden", "true");
  backdrop.loading = i < 3 ? "eager" : "lazy";
  slide.appendChild(backdrop);

  // foreground image (full, never cropped)
  const img = document.createElement("img");
  img.className = "media";
  img.src = item.src;
  img.alt = item.label;
  img.loading = i < 3 ? "eager" : "lazy";
  slide.appendChild(img);

  frame.insertBefore(slide, frame.querySelector(".slide-overlay"));

  // build thumb
  const thumb = document.createElement("div");
  thumb.className = "thumb";
  thumb.dataset.index = i;
  const ti = document.createElement("img");
  ti.src = item.src;
  ti.alt = "";
  ti.loading = "lazy";
  thumb.appendChild(ti);
  thumb.addEventListener("click", () => goTo(i, true));
  thumbs.appendChild(thumb);
});

counterTotal.textContent = String(PORTFOLIO.length).padStart(2, "0");

/* --------- progress bar tick --------- */
let progressStart = null;
let progressRaf = null;
function tickProgress(now) {
  if (!progressStart) progressStart = now;
  const elapsed = now - progressStart;
  const pct = Math.min(100, (elapsed / ADVANCE_MS) * 100);
  progressBar.style.width = pct + "%";
  if (pct < 100) progressRaf = requestAnimationFrame(tickProgress);
}
function resetProgress() {
  progressStart = null;
  if (progressRaf) cancelAnimationFrame(progressRaf);
  progressBar.style.width = "0%";
  progressRaf = requestAnimationFrame(tickProgress);
}

/* --------- navigation --------- */
function goTo(idx, userInitiated = false) {
  const total = PORTFOLIO.length;
  const next = ((idx % total) + total) % total;
  const slides = frame.querySelectorAll(".carousel-slide");
  slides.forEach((s, i) => {
    s.classList.toggle("active", i === next);
  });

  // update thumbs
  thumbs.querySelectorAll(".thumb").forEach((t, i) => {
    t.classList.toggle("active", i === next);
  });
  const active = thumbs.querySelector(".thumb.active");
  if (active) {
    const targetLeft = active.offsetLeft - thumbs.clientWidth / 2 + active.clientWidth / 2;
    thumbs.scrollTo({ left: targetLeft, behavior: "smooth" });
  }

  const item = PORTFOLIO[next];
  overlayLabel.innerHTML = item.label;
  overlayMeta.textContent = item.meta;
  typeBadge.textContent = "Foto";
  typeBadge.className = "slide-type-badge photo";

  counterCurrent.textContent = String(next + 1).padStart(2, "0");

  currentIdx = next;
  resetProgress();
  scheduleAdvance(userInitiated);
}

function scheduleAdvance() {
  clearTimeout(advanceTimer);
  advanceTimer = setTimeout(() => goTo(currentIdx + 1), ADVANCE_MS);
}

prevBtn.addEventListener("click", () => goTo(currentIdx - 1, true));
nextBtn.addEventListener("click", () => goTo(currentIdx + 1, true));

/* --------- keyboard --------- */
document.addEventListener("keydown", (e) => {
  if (e.target.matches("input, textarea, select")) return;
  if (e.key === "ArrowLeft")  goTo(currentIdx - 1, true);
  if (e.key === "ArrowRight") goTo(currentIdx + 1, true);
});

/* --------- swipe (touch) --------- */
let touchStartX = 0;
frame.addEventListener("touchstart", (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
frame.addEventListener("touchend", (e) => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) goTo(currentIdx + (dx < 0 ? 1 : -1), true);
}, { passive: true });

/* --------- init --------- */
goTo(0);

/* ============================================================
   Navbar scroll state
   ============================================================ */
const navbar = document.getElementById("navbar");
function syncNav() {
  navbar.classList.toggle("scrolled", window.scrollY > 24);
}
window.addEventListener("scroll", syncNav, { passive: true });
syncNav();

/* ============================================================
   Reveal-on-scroll
   ============================================================ */
const reveals = document.querySelectorAll(".reveal");
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in");
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
reveals.forEach((el) => io.observe(el));

/* ============================================================
   Contact form (graceful for non-Netlify previews)
   ============================================================ */
const form = document.getElementById("contactForm");
const msg = document.getElementById("formMessage");
if (form) {
  form.addEventListener("submit", (e) => {
    if (!window.location.host.includes("netlify")) {
      e.preventDefault();
      msg.textContent = "Bedankt! Je bericht is verzonden. We nemen snel contact op.";
      msg.className = "form-message success";
      form.reset();
    }
  });
}
