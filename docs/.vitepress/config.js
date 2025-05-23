module.exports = {
  title: 'ScheduleLua Documentation (Beta)',
  description: 'Documentation for the ScheduleLua MelonLoader Mod Lua API - Currently in Development',
  lastUpdated: true,
  base: '/ScheduleLua-Docs/',
  head: [
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['meta', { name: 'theme-color', content: '#42b883' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['meta', { name: 'og:title', content: 'ScheduleLua Documentation (Beta)' }],
    ['meta', { name: 'og:description', content: 'Documentation for the in-development ScheduleLua mod for Schedule 1' }]
  ],
  themeConfig: {
    logo: '/logo.png',
    siteTitle: 'ScheduleLua (Beta)',
    
    // Navigation
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'API Reference', link: '/api/' },
      { text: 'Examples', link: '/examples/' },
      { text: 'Database', link: '/database/' },
      { 
        text: 'Development', 
        items: [
          { text: 'GitHub Repository', link: 'https://github.com/ScheduleLua/ScheduleLua-Framework' },
          { text: 'Issue Tracker', link: 'https://github.com/ScheduleLua/ScheduleLua-Framework/issues' },
          { text: 'Discord Community', link: 'https://discord.gg/Ab8snpEFDn' },
          { text: 'VSCode Extension', link: 'https://github.com/ScheduleLua/ScheduleLua-Annotations/releases/tag/v1.0.3' },
        ]
      }
    ],
    
    // Sidebar
    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          collapsed: false,
          items: [
            { text: 'Introduction', link: '/guide/' },
            { text: 'Installation', link: '/guide/installation' },
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Development Status', link: '/guide/development-status' },
          ]
        },
        {
          text: 'Core Concepts',
          collapsed: false,
          items: [
            { text: 'Script Structure', link: '/guide/script-structure' },
            { text: 'Lifecycle Hooks', link: '/guide/lifecycle-hooks' },
            { text: 'Best Practices', link: '/guide/best-practices' },
            { text: 'Limitations', link: '/guide/limitations' }
          ]
        },
        {
          text: 'Mod System',
          collapsed: false,
          items: [
            { text: 'Mod System Overview', link: '/guide/mod-system' },
            { text: 'Mod Imports and Exports', link: '/guide/mod-functions' },
            { text: 'Mod Deployment', link: '/guide/mod-deployment' }
          ]
        },
        {
          text: 'Contributing',
          collapsed: false,
          items: [
            { text: 'How to Contribute', link: '/guide/contributing' },
            { text: 'Reporting Issues', link: '/guide/reporting-issues' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'Core API',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/api/' },
            { text: 'Logging', link: '/api/core/logging' },
            { text: 'Commands', link: '/api/core/commands' },
            { text: 'Timing', link: '/api/core/timing' },
            { text: 'GameObjects', link: '/api/core/gameobjects' },
            { text: 'Globals', link: '/api/core/globals' },
            { text: 'Mod System', link: '/api/mod/' },
          ]
        },
        {
          text: 'Player API',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/api/player/' },
            { text: 'Status', link: '/api/player/status' },
            { text: 'Movement', link: '/api/player/movement' },
            { text: 'Inventory', link: '/api/player/inventory' },
          ]
        },
        {
          text: 'NPC API',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/api/npc/' },
            { text: 'Finding NPCs', link: '/api/npc/finding' },
            { text: 'Managing NPCs', link: '/api/npc/managing' },
          ]
        },
        {
          text: 'World API',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/api/world/' },
            { text: 'Game Time', link: '/api/world/game-time' },
            { text: 'Time Events', link: '/api/world/events' },
            { text: 'Map', link: '/api/world/map' },
            { text: 'Explosions', link: '/api/world/explosions' },
          ]
        },
        {
          text: 'Native UI API',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/api/ui/' },
            { text: 'Notifications', link: '/api/ui/notifications' },
            { text: 'Messages', link: '/api/ui/messages' },
            { text: 'Dialogs', link: '/api/ui/dialogs' },
            { text: 'Storages', link: '/api/ui/storages' },
          ]
        },
        {
          text: 'Custom UI API',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/api/custom-ui/' },
            { text: 'Windows', link: '/api/custom-ui/windows' },
            { text: 'Controls', link: '/api/custom-ui/controls' },
            { text: 'Styling', link: '/api/custom-ui/styling' },
          ]
        },
        {
          text: 'Helper Functions',
          collapsed: true,
          items: [
            { text: 'Vector Operations', link: '/api/helper/' },
          ]
        },
        {
          text: 'Unity API',
          collapsed: true,
          items: [
            { text: 'Key Input', link: '/api/unity/' },
          ]
        },
        {
          text: 'Economy API',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/api/economy/' },
            { text: 'Transactions', link: '/api/economy/transactions' },
          ]
        },
        {
          text: 'Law API',
          collapsed: true,
          items: [
            { text: 'Overview', link: '/api/law/' },
            { text: 'Curfew', link: '/api/law/curfew' },
          ]
        }
      ],
      '/examples/': [
        {
          text: 'Example Scripts',
          collapsed: false,
          items: [
            { text: 'Basic Script', link: '/examples/' },
            { text: 'UI Example', link: '/examples/ui' },
            { text: 'Registry Example', link: '/examples/registry' },
            { text: 'Economy Example', link: '/examples/economy' },
            { text: 'Curfew Example', link: '/examples/curfew' },
            { text: 'Mod System Example', link: '/examples/mod-system' },
          ]
        },
        {
          text: 'Note',
          items: [
            { 
              text: 'Implementation Status', 
              link: '/examples/#implementation-status',
              items: [
                { text: 'Some examples may demonstrate planned functionality that is not yet fully implemented.' }
              ]
            }
          ]
        }
      ],
      '/database/': [
        {
          text: 'Game Database',
          collapsed: false,
          items: [
            { text: 'Overview', link: '/database/' },
            { text: 'NPC Database', link: '/database/npcs' },
            { text: 'Item Database', link: '/database/items' },
            { text: 'Prefab Database', link: '/database/prefabs' },
            { text: 'Region Database', link: '/database/regions' },
          ]
        }
      ]
    },
    
    // Social links
    socialLinks: [
      { icon: 'github', link: 'https://github.com/ScheduleLua/ScheduleLua-Framework' },
      { icon: 'discord', link: 'https://discord.gg/Ab8snpEFDn' }
    ],
    
    // Footer
    footer: {
      message: 'Released as Beta Software under the GPL-3.0 License.',
      copyright: 'Built with VitePress'
    },
    
    // Additional features
    search: {
      provider: 'local'
    },
    
    outline: {
      level: 'deep',
      label: 'On this page'
    },
    
    editLink: {
      pattern: 'https://github.com/ScheduleLua/ScheduleLua-Docs/edit/dev/docs/:path',
      text: 'Help improve this page'
    },
    
    // Appearance customization
    appearance: {
      darkerTheme: true
    }
  }
} 