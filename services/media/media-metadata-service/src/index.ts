import Fastify from 'fastify';
const app = Fastify({ logger: true });
const PORT = Number(process.env.PORT) || 3000;

app.get('/health', async () => ({ status: 'ok', service: 'media-metadata-service' }));
app.get('/api/v1', async () => ({ service: 'media-metadata-service', version: '1.0.0', description: 'Photo/video EXIF metadata' }));

app.listen({ port: PORT, host: '0.0.0.0' }, (err) => {
  if (err) { app.log.error(err); process.exit(1); }
});
export default app;
