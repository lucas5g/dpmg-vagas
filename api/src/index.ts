import { Elysia, t } from 'elysia';
import { cors } from '@elysiajs/cors';
import postgres from 'postgres';

// Configurando conexão com o banco de dados
const sql = postgres('postgres://postgres:postgresspassword@localhost:5433/dpmg_vagas');

// Setup inicial do banco de dados (se a tabela ainda não existir)
await sql`
  CREATE TABLE IF NOT EXISTS candidaturas (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    job VARCHAR(255) NOT NULL,
    salary VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;

export const app = new Elysia()
    .use(cors()) // Habilitando CORS para o Frontend em React
    .post(
        '/candidaturas',
        async ({ body, set }) => {
            try {
                const result = await sql`
          INSERT INTO candidaturas (name, email, job, salary)
          VALUES (${body.name}, ${body.email}, ${body.job}, ${body.salary})
          RETURNING *
        `;

                set.status = 201;
                return { success: true, candidatura: result[0] };
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
