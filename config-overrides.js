const {
  override,
  addLessLoader
} = require('customize-cra');

module.exports = override(
  /**
   * @ less
  */
  addLessLoader({
      javascriptEnabled: true,
  }),
)

