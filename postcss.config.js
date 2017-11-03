module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: ['last 2 versions', 'ie > 9'],
    }),
    require('postcss-inline-svg')(),
    require('postcss-svgo')(
      {
        plugins: [{
            removeDoctype: false
          }, {
            removeComments: false
          }, {
            cleanupNumericValues: {floatPrecision: 2}
          }, {
            convertColors: {
                names2hex: false,
                rgb2hex: false
            }
        }]
      }
    ),
    require('postcss-assets')({
      basePath:	'.',
      baseUrl: '/',
      cachebuster: true,
      loadPaths: ['**']
    }),
    require('cssnano')({
      preset: ['default', {
          svgo: false,
          discardComments: {
              removeAll: true,
          },
      }]
    })
  ]
}
