import adapter from '@sveltejs/adapter-node';

export default {
  kit: {
    adapter: adapter(),
    alias: {
      '@api': './src/lib/api',
      '@components': './src/lib/components',
      '@src': './src',
      '@translations': './src/lib/translations',
      '@utils': './src/lib/utils'
    }
  }
};
