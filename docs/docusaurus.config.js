module.exports = {
  title: 'ti-engine',
  tagline: 'JavaScript Technical Indicator package',
  url: 'https://ChironMind.github.io',
  baseUrl: '/',
//  favicon: 'img/favicon.ico',
  organizationName: 'ChironMind', 
  projectName: 'ti-engine', 
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  themeConfig: {
    navbar: {
      title: 'ti-engine',
//      logo: {
  //      alt: 'Site Logo',
    //    src: 'img/logo.svg',
      //},
      items: [
        {to: '/docs', label: 'Docs', position: 'left'},
        {to: '/api/index.html', label: 'API', position: 'left'},
        {
          href: 'https://github.com/chironmind/ti-engine',
          label: 'GitHub',
          position: 'right'
        }
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {label: 'Tutorial', to: '/docs/tutorials/getting-started'},
          ],
        },
        {
          title: 'Community',
          items: [
            {label: 'GitHub', href: 'https://github.com/chironmind/ti-engine'},
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ti-engine.`,
    },
  },
};
