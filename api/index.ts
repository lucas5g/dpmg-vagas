import { node } from '@elysiajs/node';
import { app } from '../server/src/index';

// Adapter para rodar Elysia como serverless function na Vercel (Node.js runtime)
export default node(app);
