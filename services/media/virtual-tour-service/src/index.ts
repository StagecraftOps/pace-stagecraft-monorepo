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

app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'virtual-tour-service' }));
app.get('/api/v1', (_req, res) => res.json({ service: 'virtual-tour-service', version: '1.0.0', description: '3D virtual tour delivery' }));

app.listen(PORT, () => console.log($name running on port +PORT));
export default app;
