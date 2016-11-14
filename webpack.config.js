module.exports = {
  entry: './site.jsx',
  output: {
    path: `${__dirname}`,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module:{
    loaders:[{
      test: /\.jsx?$/,
      loader: 'babel',
      exclude:/node_modules/,
      include: `${__dirname}`,
      query: {
        // Here you can put plugins, like plugins:['transform-runtime']
        plugins:['transform-class-properties'],
        // Notice that by adding es2015 that it adds all of React, which
        // is massive.
        presets: ['react', 'es2015']
      }
    }]
  }
};
