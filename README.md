# Geluidsexperience Website

Professionele website voor Geluidsexperience - geluid- en lichtinstallaties voor events, bands en artiesten.

## 📋 Inhoud

- `index.html` - Hoofdpagina met alle secties
- `style.css` - Modern, responsive design
- `script.js` - Interactiviteit (menu, gallery, forms)
- `netlify.toml` - Netlify configuratie
- `logo.svg` - Geluidsexperience logo
- Mediabestanden (foto's en video's)

## 🚀 Deployment op Netlify

### Stap 1: Voorbereiding
1. Zorg dat je Git geïnstalleerd hebt
2. Maak een GitHub account aan (gratis op github.com)

### Stap 2: Zet de site op GitHub
```bash
cd /Users/joelplas/Sites/geluidsexperience

# Initialiseer Git repository
git init
git add .
git commit -m "Initial commit: Geluidsexperience website"

# Maak een repository aan op GitHub en volg de instructies
# of push naar bestaande repository
```

### Stap 3: Connect met Netlify
1. Ga naar [netlify.com](https://netlify.com)
2. Log in of maak een account
3. Klik "New site from Git"
4. Verbind je GitHub account
5. Selecteer je `geluidsexperience` repository
6. Zorg dat deze instellingen kloppen:
   - Build command: (leeg laten)
   - Publish directory: `.`
7. Klik "Deploy site"

### Stap 4: Custom Domain (optioneel)
Na deployment:
1. Ga naar Site Settings
2. Klik "Domain management"
3. Voeg je eigen domein toe (bijv. geluidsexperience.nl)
4. Volg de instructies om DNS in te stellen

## 📝 Contact Formulier

Het contact formulier wordt automatisch afgehandeld door Netlify Forms. Wanneer iemand het formulier invult:
- Je ontvangt een notificatie per email
- De inzending wordt opgeslagen in Netlify dashboard

## 🖼️ Media Beheren

Zet foto's en video's in de project map:
- Zorg dat bestandsnamen correct zijn (bijv. `IMG_0001.jpeg`)
- Ondersteunde formaten: JPG, PNG, MP4, WebM, MOV
- Website laadt automatisch alle mediabestanden

## 🎨 Aanpassingen Maken

### Logo wijzigen
Vervang `logo.svg` met je nieuwe logo

### Tekst aanpassen
Edit de tekst rechtstreeks in `index.html`

### Kleuren wijzigen
In `style.css`, wijzig `:root` variabelen:
```css
:root {
    --primary-color: #3490de;  /* Wijzig deze blauwe kleur */
}
```

### Contactinfo
Update in `index.html` section #contact:
```html
<a href="mailto:joel.plas@gmail.com">joel.plas@gmail.com</a>
```

## 📱 Responsive Design

Website werkt perfect op:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobiel (< 768px)

## ✨ Features

- ✅ Moderne, snelle website
- ✅ Mobile-first responsive design
- ✅ Photo/video gallery met lightbox
- ✅ Contact formulier met Netlify Forms
- ✅ Smooth scrolling & animations
- ✅ SEO-optimized
- ✅ Fast loading times

## 🔧 Local Testing

Open `index.html` in je browser of:
```bash
# Met Python 3
python3 -m http.server 8000

# Met Node.js
npx http-server
```

Dan ga je naar `http://localhost:8000`

## 📞 Support

Voor vragen over de website of verder aanpassingen, neem contact op.

---

**Geluidsexperience** - Altijd goed geluid 🎵
