const path = require('path');

module.exports = {
  entry: './src/index.js',
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  output: {
    library: 'MaterialUI',
    libraryTarget: 'umd',
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
