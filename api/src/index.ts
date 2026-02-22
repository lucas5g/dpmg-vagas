import { Elysia, t } from 'elysia';
import { cors } from '@elysiajs/cors';
import { Database } from 'bun:sqlite';

// Configurando conexão com o banco de dados (SQLite)
const db = new Database('vagas.sqlite', { create: true });

// Setup inicial do banco de dados (se a tabela ainda não existir)
db.run(`
  CREATE TABLE IF NOT EXISTS candidaturas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    job TEXT NOT NULL,
    salary TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export const app = new Elysia()
    .use(cors()) // Habilitando CORS para o Frontend em React
    .post(
        '/candidaturas',
        async ({ body, set }) => {
            try {
                const stmt = db.prepare(`
                    INSERT INTO candidaturas (name, email, job, salary)
                    VALUES ($name, $email, $job, $salary)
                    RETURNING *
                `);

                const result = stmt.get({
                    $name: body.name,
                    $email: body.email,
                    $job: body.job,
                    $salary: body.salary,
                });

                if (!result) {
                    throw new Error('Falha ao inserir candidatura');
                }

                set.status = 201;
                return { success: true, candidatura: result };
            } catch (error) {
                console.error('Erro ao salvar no banco:', error);
                set.status = 500;
                return { success: false, error: 'Erro ao salvar a candidatura no banco de dados' };
            }
        },
        {
            body: t.Object({
                name: t.String(),
                email: t.String(),
                job: t.String(),
                salary: t.String(),
            }),
        }
    )
    .listen(3000);

console.log(`🦊 Elysia backend rodando em http://${app.server?.hostname}:${app.server?.port}`);
