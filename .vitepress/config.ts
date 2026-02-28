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
        'README.md': 'index.md',
        'docs/:path*': ':path*'
    },
    markdown: {
        config: (md) => {
            md.core.ruler.push('replace_docs_links', function (state) {
                state.tokens.forEach(token => {
                    if (token.type === 'inline' && token.children) {
                        token.children.forEach(child => {
                            if (child.type === 'link_open') {
                                const hrefIndex = child.attrIndex('href');
                                if (hrefIndex >= 0 && child.attrs) {
                                    const href = child.attrs[hrefIndex][1];
                                    if (href && href.startsWith('./docs/')) {
                                        child.attrs[hrefIndex][1] = href.replace('./docs/', '/');
                                    }
                                }
                            }
                        });
                    }
                });
            });
        }
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
                    { text: 'Integração IDE e Figma', link: '/CONEXAO' },
                    { text: 'Testes Automatizados por IA', link: '/TESTES' },
                    { text: 'IA/CI/CD', link: '/IACICD' },
                    { text: 'Dados Internos e IA', link: '/RAG' }
                ]
            }
        ]
    }
})
