import preprocess from 'svelte-preprocess'
import adapter from '@sveltejs/adapter-auto'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // preprocesss: [preprocess({typescript: true})],

  vitePlugin: {
    preprocess: [
      preprocess({
        typescript: true,
        postcss: true,
      })
    ]
  },

  // onwarn: (warning, handle) => {
  //   // 屏蔽 a11y 的警告
  //   if (warning.code.startsWith('a11y')) return
  //   handle(warning)
  // },

  kit: {
    adapter: adapter(),

    alias: {
      '~/*': 'src/*',
      '@/*': './*'
    },

    serviceWorker: {
      register: process.env.NODE_ENV === 'production'
    }
  },
}

export default config
