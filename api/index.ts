import { Elysia, t } from 'elysia';
import { cors } from '@elysiajs/cors';
import { Database } from 'bun:sqlite';

const db = new Database('/tmp/vagas.sqlite', { create: true });

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

// Exportação direta sem variável intermediária — evita TDZ no Bun/Vercel
export default new Elysia({ prefix: '/api' })
    .use(cors()) // Habilitando CORS para o Frontend em React
    .get('/', () => ({ message: 'API de Candidaturas - DPMG Vagas' }))
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
    .get('/candidaturas', () => {
        try {
            const stmt = db.prepare('SELECT * FROM candidaturas ORDER BY created_at DESC');
            const candidaturas = stmt.all();
            return { success: true, candidaturas };
        } catch (error) {
            console.error('Erro ao buscar candidaturas:', error);
            return { success: false, error: 'Erro ao buscar candidaturas no banco de dados' };
        }
    });
