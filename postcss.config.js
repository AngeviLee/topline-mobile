// module.exports = {
//   plugins: {
//     autoprefixer: {},
//     'postcss-pxtorem': {
//       rootValue: 37.5,
//       propList: ['*']
//     }
//   }
// }
const path = require('path')

module.exports = (data) => {
  // 如果是node_module/vant相关文件，则将rootValue设置为37.5，否则设置为75
  const rootValue = data.file.dirname.indexOf(`node_modules${path.sep}vant`) !== -1
    ? 37.5
    : 75

  return {
    plugins: {
      autoprefixer: {},
      'postcss-pxtorem': {
        rootValue,
        propList: ['*']
      }
    }
  }
}
