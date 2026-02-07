import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import weatherRoutes from './routes/weatherRoutes.js';

dotenv.config({ path: path.join(process.cwd(), 'server', '.env') });

const app = express();
const port = process.env.PORT || 3001;

app.use(
    cors({
        origin: [
            'http://localhost:5173',
            'https://weather-application-indol-tau.vercel.app'
        ]
    })
);

app.use('/api', weatherRoutes);

app.listen(port, () => {
    console.log(`Weather proxy listening on port ${port}`);
});
