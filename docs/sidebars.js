module.exports = {
  docsSidebar: [
    {
      type: 'doc',
      id: 'index',
      label: 'Introduction',
    },
    {
      type: 'category',
      label: 'Tutorials',
//      id: 'tutorials/index',
      items: [
	'tutorials/index',
	'tutorials/getting-started',
        'tutorials/plotting',
        'tutorials/advanced',
        'tutorials/api',
        'tutorials/websockets',
      ],
    },
    {
      type: 'category',
      label: 'How-To Guides',
  //    id: 'howto/index',
      items: [
	'howto/index',
        'howto/bulk-vs-single',
        'howto/choose-constant-model',
        'howto/choose-deviation-model',
        'howto/choose-period',
        'howto/mcginley-dynamic',
      ],
    },
    {
      type: 'link',
      label: 'API Reference',
      href: '/api/index.html',
    },
  ],
};
