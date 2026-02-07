import { Router } from 'express';
import { getWeatherByZip } from '../controllers/weatherController.js';

const router = Router();

router.get('/weather', getWeatherByZip);

export default router;
