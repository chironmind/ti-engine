module.exports = {
  title: 'ti-engine',
  tagline: 'JavaScript Technical Indicator package',
  url: 'https://ChironMind.github.io',
  baseUrl: '/ti-engine/',
//  favicon: 'img/favicon.ico',
  organizationName: 'ChironMind', 
  projectName: 'ti-engine', 
  onBrokenLinks: 'warn',
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
        {label: 'Tutorials', to: '/docs/tutorials/index', position: 'left'},
        {label: 'How-To', to: '/docs/howto/index', position: 'left'},
        {label: 'API', to: '/api/index.html', position: 'left'},
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
            {label: 'Tutorials', to: '/docs/tutorials/index'},
            {label: 'How-To', to: '/docs/howto/index'},
            {label: 'API', to: '/api/index.html'},
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
