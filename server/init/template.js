const mongoose = require('mongoose')
const Template = require('../models/Template.model')
mongoose.connect('mongodb://127.0.0.1:27017/mis-node')

function initTemplate() {
  return new Promise(resolve => {
    Template.insertMany([
      {
        temp_name: '搜索页模板',
        temp_id: 1,
        temp_components: {
          searchFields: '搜索区域',
          showFields: '展示区域'
        }
      },
      {
        temp_name: '详情页模板',
        temp_id: 2,
        temp_components: {
          showFields: '展示区域'
        }
      }
    ], (err) => {
      if (err) console.log('发生错误');
      resolve()
    })
  })
}
module.exports = initTemplate
