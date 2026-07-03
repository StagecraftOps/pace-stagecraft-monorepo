import Fastify from 'fastify';
const app = Fastify({ logger: true });
const PORT = Number(process.env.PORT) || 3000;

app.get('/health', async () => ({ status: 'ok', service: 'reverse-geocoding-service' }));
app.get('/api/v1', async () => ({ service: 'reverse-geocoding-service', version: '1.0.0', description: 'Lat/lng to address reverse geocoding' }));

app.listen({ port: PORT, host: '0.0.0.0' }, (err) => {
  if (err) { app.log.error(err); process.exit(1); }
});
export default app;
