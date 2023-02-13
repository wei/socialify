/** @type {import('next').NextConfig["rewrites"]} */
module.exports = [
  {
    source: '/:path*',
    has: [
      {
        type: 'query',
        key: 'logo',
        value:
          'https://raw.githubusercontent.com/Harry-Jing/EdgeGPT/master/.readme/Bing_favicon.png'
      }
    ],
    destination:
      '/:path*?logo=https://upload.wikimedia.org/wikipedia/commons/9/9c/Bing_Fluent_Logo.svg'
  },
  {
    source: '/:path*',
    has: [
      {
        type: 'query',
        key: 'logo',
        value: 'https://s2.loli.net/2022/04/25/xOiJn7lCdcT5Mw1.png'
      }
    ],
    destination:
      '/:path*?logo=https://user-images.githubusercontent.com/5880908/218407342-148803b6-742c-4f2a-b821-b260c7e28c29.png'
  },
  {
    source: '/:path*',
    has: [
      {
        type: 'query',
        key: 'logo',
        value: 'https://telegra.ph/file/01385a9f4cf0419682b87.png'
      }
    ],
    destination:
      '/:path*?logo=https://user-images.githubusercontent.com/5880908/218408267-5ce0cd4b-ad02-4b56-87ef-d75b1c109659.png'
  }
]
