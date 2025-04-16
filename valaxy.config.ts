import type { UserThemeConfig } from 'valaxy-theme-yun'
import { defineValaxyConfig } from 'valaxy'

// add icons what you will need
const safelist = [
  'i-ri-home-line',
]

/**
 * User Config
 */
export default defineValaxyConfig<UserThemeConfig>({
  // site config see site.config.ts

  theme: 'yun',

  themeConfig: {
    banner: {
      enable: true,
      title: '向量的小站',
    },
  },

  unocss: { safelist },
})

// import { defineConfig } from 'valaxy'
// import type { ThemeConfig } from 'valaxy-theme-hairy'
// import { addonWaline } from 'valaxy-addon-waline'
// // import { addonMeting } from 'valaxy-addon-meting'

// /**
//  * User Config
//  * do not use export const config to avoid defu conflict
//  */
// export default defineConfig<ThemeConfig>({
//   theme: 'hairy',
//   addons: [
//     // addonMeting({
//     //   global: true,
//     //   props: {
//     //     // 设置网易云/qq或其他歌单ID
//     //     id: '8261729315',
//     //     type: 'playlist',
//     //     autoplay: false,
//     //     theme: 'var(--hy-c-primary)',
//     //   },
//     // }),
//     // Waline 评论系统
//     // 请参考 https://waline.js.org/ 设置 serverURL 地址
//     addonWaline({
//       comment: true,
//       serverURL: '',
//       emoji: [],
//       pageview: true,
//     }),
//   ]
// })
