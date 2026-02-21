import { defineConfig } from 'vitepress'

export default defineConfig({
    title: "DPMG Vagas",
    description: "Documentação do Projeto",
    base: '/docs/',
    cleanUrls: true,
    srcDir: '.',
    rewrites: {
        'README.md': 'index.md',
        'docs/:path*': ':path*'
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
                    { text: 'Testes', link: '/TESTES' },
                    { text: 'Conexão', link: '/CONEXAO' },
                    { text: 'CI/CD', link: '/IACICD' }
                ]
            }
        ]
    }
})
