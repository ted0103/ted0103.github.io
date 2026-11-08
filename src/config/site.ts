export const site = {
  name: 'Tan Ted Hang',
  shortName: 'Ted',
  description: 'First-year Computer Science (Information Systems) student at Universiti Malaya, building software and exploring human-centred product design.',
  url: 'https://ted0103.github.io',
  email: 'tedhangtan@gmail.com',
  instagram: 'https://www.instagram.com/_hwalker_1/',
  github: 'https://github.com/ted0103',
  availability: 'Open to meaningful collaborations',
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects/' },
    { label: 'About', href: '/about/' },
    { label: 'Contact', href: '/contact/' },
  ],
  featuredRepositories: [
    {
      slug: 'questmark',
      owner: 'ted0103',
      repo: 'questmark',
      snapshotKey: 'questmark',
      showSource: true,
    },
    {
      slug: 'celestial-archive',
      owner: 'ted0103',
      repo: 'celestial-archive',
      snapshotKey: 'celestial-archive',
      showSource: true,
    },
    {
      slug: 'teds-personal-portfolio',
      owner: 'ted0103',
      repo: 'ted0103.github.io',
      snapshotKey: 'teds-personal-portfolio',
      showSource: false,
    },
  ],
} as const;
