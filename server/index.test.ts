import { describe, it, expect } from 'bun:test';

import app from './index'

const api = 'http://localhost/api/candidaturas';

describe('API Candidaturas', () => {
    it('deve criar uma nova candidatura com sucesso', async () => {
        const payload = {
            name: 'Candidato Teste',
            email: 'candidato@teste.com',
            job: 'Desenvolvedor Fullstack',
            salary: '8000'
        };

        const req = new Request(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const response = await app.handle(req);

        expect(response.status).toBe(201);

        const body: any = await response.json();
        expect(body.success).toBe(true);
        expect(body.candidatura).toBeDefined();
        expect(body.candidatura.name).toBe(payload.name);
        expect(body.candidatura.email).toBe(payload.email);
        expect(body.candidatura.job).toBe(payload.job);
        expect(body.candidatura.salary).toBe(payload.salary);
    });

    it('deve falhar ao enviar um payload incompleto', async () => {
        const req = new Request(api, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: 'Candidato Incompleto'
                // faltando email, job e salary
            })
        });

        const response = await app.handle(req);

        // Elysia default behavior for schema validation failures is 422 Unprocessable Content
        expect(response.status).toBe(422);
    });
});
