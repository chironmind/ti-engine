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
        {label: 'Tutorial', to: '/docs/tutorials/getting-started', position: 'left'},
        {label: 'How-To', to: '/docs/howto/getting-started', position: 'left'},
        {label: 'API', to: '/docs/api/index.html', position: 'left'},
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
            {label: 'How-To', to: '/docs/howto/getting-started'},
            {label: 'API', to: '/docs/api/index.html'},
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
