import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = process.env.PORT || 8080;

// зберігаємо події тимчасово в оперативці
const receivedDonations = [];

app.use(cors());
app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
    const data = req.body;
    console.log('Webhook received:', data);

    const donationEvent = {
        timestamp: new Date().toISOString(),
        client_id: data.client_id || null,
        utm_source: data.utm_source || null,
        utm_medium: data.utm_medium || null,
        amount: data.amount || 0
    };

    receivedDonations.push(donationEvent);
    res.json({ status: 'ok', saved: donationEvent });
});

// для тесту: GET /events
app.get('/events', (req, res) => {
    res.json(receivedDonations);
});

app.get('/reset', (req, res) => {
    receivedDonations.length = 0;
    res.json({ status: 'cleared' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
