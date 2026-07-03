import Fastify from 'fastify';
const app = Fastify({ logger: true });
const PORT = Number(process.env.PORT) || 3000;

app.get('/health', async () => ({ status: 'ok', service: 'oauth-service' }));
app.get('/api/v1', async () => ({ service: 'oauth-service', version: '1.0.0', description: 'OAuth 2.0 / OIDC provider' }));

app.listen({ port: PORT, host: '0.0.0.0' }, (err) => {
  if (err) { app.log.error(err); process.exit(1); }
});
export default app;
