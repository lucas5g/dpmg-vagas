import { Elysia, t } from 'elysia';
import { cors } from '@elysiajs/cors';
import postgres from 'postgres';

const dbUrl = new URL(process.env.DATABASE_URL!);
const schemaName = dbUrl.searchParams.get('schema') || 'public';
dbUrl.searchParams.delete('schema');

// postgres.js não reconhece '?schema=', mas o Postgres aceita '?search_path=' em conexões
if (schemaName !== 'public') {
    dbUrl.searchParams.set('search_path', `"${schemaName}"`);
}

const sql = postgres(dbUrl.toString(), {
    onnotice: () => { }, // Ignora os logs de "NOTICE" do PostgreSQL (ex: schema already exists)
});

// Setup inicial do banco de dados
// Garante o schema (útil caso a string de conexão contenha schemas customizados de painéis)
if (schemaName !== 'public') {
    await sql.unsafe(`CREATE SCHEMA IF NOT EXISTS "${schemaName}"`);
}

// Criar tabela
await sql`
  CREATE TABLE IF NOT EXISTS candidaturas (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    job TEXT NOT NULL,
    salary TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`;


// Exportação direta sem variável intermediária — evita TDZ no Bun/Vercel
const app = new Elysia({ prefix: '/api' })
    .use(cors()) // Habilitando CORS para o Frontend em React
    .get('/', () => ({ message: 'API de Candidaturas - DPMG Vagas' }))
    .post(
        '/candidaturas',
        async ({ body, set }) => {
            try {
                const result = await sql`
                    INSERT INTO candidaturas (name, email, job, salary)
                    VALUES (${body.name}, ${body.email}, ${body.job}, ${body.salary})
                    RETURNING *
                `;

                if (!result || result.length === 0) {
                    throw new Error('Falha ao inserir candidatura');
                }

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
    .get('/candidaturas', async () => {
        try {
            const res = await sql`SELECT * FROM candidaturas ORDER BY created_at DESC`;
            return res;
        } catch (error) {
            console.error('Erro ao buscar candidaturas:', error);
            return { success: false, error: 'Erro ao buscar candidaturas no banco de dados' };
        }
    });

export default app;

if (typeof Bun !== 'undefined' && process.env.NODE_ENV !== 'production') {
    app.listen(3000);
    console.log(`🦊 Elysia backend rodando em http://${app.server?.hostname}:${app.server?.port}/api`);
}