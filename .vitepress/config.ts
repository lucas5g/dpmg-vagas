import { defineConfig } from 'vitepress'

export default defineConfig({
    title: "DPMG Vagas",
    description: "Documentação do Projeto",
    base: '/docs/',
    cleanUrls: true,
    srcDir: '.',
    head: [
        ['style', {}, '.vp-doc p, .vp-doc li { text-align: justify; }; ']
    ],
    rewrites: {
        'README.md': 'index.md'
    },
    vite: {
        server: {
            host: '127.0.0.1',
            port: 5174,
            strictPort: true
        }
    },
    themeConfig: {
        // nav: [
        //     { text: 'Início', link: '/' },
        //     { text: 'Testes', link: '/TESTES' },
        //     { text: 'Conexão', link: '/CONEXAO' },
        //     { text: 'CI/CD', link: '/IACICD' }
        // ],
        sidebar: [
            {
                // text: 'Guias',
                items: [
                    { text: 'Início', link: '/' },
                    { text: 'Integração IDE e Figma', link: '/docs/CONEXAO' },
                    { text: 'Testes Automatizados por IA', link: '/docs/TESTES' },
                    { text: 'IA/CI/CD', link: '/docs/IACICD' },
                    { text: 'Dados Internos e IA', link: '/docs/RAG' }
                ]
            }
        ]
    }
})
