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
		routeBasePath: '/',
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
        {label: 'Tutorials', to: '/tutorials', position: 'left'},
        {label: 'How-To', to: '/howto', position: 'left'},
        {label: 'API', href: '/api/index.html', position: 'left'},
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
            {label: 'Tutorials', to: '/tutorials'},
            {label: 'How-To', to: '/howto'},
            {label: 'API', href: '/api/index.html'},
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
