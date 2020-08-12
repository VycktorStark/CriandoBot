module.exports = {
  title: 'Criando bot',
  description: 'Criador do Projeto: VycktorStark',
  base: '/CriandoBot/',
  themeConfig:{
  	sidebar: [
  	['/', 'Inicio'],
  	['criandobot/aulas/Piloto.html', 'Primeira Aula'],
  	['criandobot/aulas/Comunicacao.html', 'Segunda Aula'],
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
