exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: 'Method not allowed' })
        };
    }

    try {
        const { name, email, phone, eventType, message } = JSON.parse(event.body);

        // Validate required fields
        if (!name || !email || !message) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Missing required fields' })
            };
        }

        // Here you could integrate with an email service like SendGrid, Mailgun, etc.
        // For now, this is a placeholder that returns success

        console.log('Contact form submission:', {
            name,
            email,
            phone,
            eventType,
            message,
            timestamp: new Date().toISOString()
        });

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Form submitted successfully'
            })
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Server error' })
        };
    }
};
