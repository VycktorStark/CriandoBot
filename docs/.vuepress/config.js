module.exports = {
  title: 'Criando bot',
  description: 'Criador do Projeto: VycktorStark',
  base: '/CriandoBot/',
  themeConfig:{
    search: false,
    nav: [
      {
        text: 'Aulas',
        ariaLabel: 'Menu de Aulas',
        items: [
          { text: 'Introdução', link: '/' },
          { text: 'Primeira Aula', link: '/criandobot/aulas/Piloto.html' },
          { text: 'Segunda Aula', link: '/criandobot/aulas/Comunicacao.html' }
          ]
        },
        { text: 'Projeto', link: 'https://github.com/VycktorStark/CriandoBot/tree/master/Projeto' },
        { text: 'Patrocinar', link: 'https://app.picpay.com/VycktorStark' }
      ]
  },
  head: [
    ['link', { rel: 'shortcut icon', href: '/assets/img/favicon.ico' }],
    ['link', { rel: 'icon', href: '/assets/img/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', href: '/assets/img/logo.png' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'mask-icon', href: '/assets/img/logo.png', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  plugins: [
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: {
          message: "Temos novidade",
          buttonText: "Atualizar"
        }
      }
    ]
  ],
}
