const sanitizeHtml = require('sanitize-html')

module.exports = (html) => {
  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
  })
}
