module.exports = function (plop) {
  plop.setGenerator('test', {
    actions: [{
      type: 'add',
      path: 'tests/{{dashCase name}}.ava.js',
      templateFile: 'template.js'
    }]
  });

};