module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    'postcss-nested': {},
    'postcss-preset-env': {
      stage: 1,
      features: {
        'focus-visible-pseudo-class': false,
      },
    },
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
  },
};
