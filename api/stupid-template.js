const flatten = require('flattenjs').convert

escapeRegExp = _ => _.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1")

module.exports = (template) => (data) => {
  output = template
  for (let [key, value] of Object.entries(flatten(data))) {
    // Traditional replacement
    output = output.replace(new RegExp("{{"+escapeRegExp(key)+"}}","g"), value)
  }
  return output
}
