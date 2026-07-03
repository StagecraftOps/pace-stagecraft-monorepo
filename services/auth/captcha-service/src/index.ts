import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'captcha-service' }));
app.get('/api/v1', (_req, res) => res.json({ service: 'captcha-service', version: '1.0.0', description: 'CAPTCHA challenge service' }));

app.listen(PORT, () => console.log($name running on port +PORT));
export default app;
