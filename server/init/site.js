const mongoose = require('mongoose')
const Site = require('./../models/Site.model')
mongoose.connect('mongodb://127.0.0.1:27017/mis-node')

function initSite() {
  return new Promise(resolve => {
    Site.create({
      site_name: '这是个测试网站',
      site: 'site',
      site_template: '1',
      site_desc: '测试描述，巴拉巴拉',
      site_menus: [
        {
          menu_name: '菜单一',
          menu: 'menu1',
          menu_url: '/menu1',
        },
        {
          menu_name: '菜单二',
          menu: 'menu2',
          menu_url: '/menu2',
        }
      ],
      site_pages: [
        {
          page_name: '搜索页面',
          page_url: 'xxx/yyyy',
          page: '/site/search',
          page_template: '1',
          crud_url: '',
          page_config: {
            url: 'xxx/ssss',
            selected_components: ['searchFields', 'showFields'],
            fields: {
              searchFields: [
                {
                  key: 'name',
                  label: '姓名',
                  displayType: 'string'
                },
                {
                  key: 'sex',
                  label: '性别',
                  displayType: 'checkbox',
                  extra: [
                    {
                      label: '男',
                      value: 1
                    },
                    {
                      label: '女',
                      value: 2
                    }
                  ]
                }
              ],
              showFields: [
                {
                  key: 'name',
                  label: '姓名',
                  displayType: 'string'
                },
                {
                  key: 'sex',
                  label: '性别',
                  displayType: 'checkbox',
                  extra: [
                    {
                      label: '男',
                      value: 1
                    },
                    {
                      label: '女',
                      value: 2
                    }
                  ]
                }
              ]
            }
          }
        },
        {
          page_name: '详情页面',
          page: "/site/detail",
          page_url: 'xxx/yyyy',
          page_template: '2',
          page_config: {
            url: 'xxx/ssss',
            selected_components: ['showFields'],
            fields: {
              searchFields: [
                {
                  key: 'name',
                  label: '姓名',
                  displayType: 'string'
                },
                {
                  key: 'sex',
                  label: '性别',
                  displayType: 'checkbox',
                  extra: [
                    {
                      label: '男',
                      value: 1
                    },
                    {
                      label: '女',
                      value: 2
                    }
                  ]
                }
              ],
              showFields: [
                {
                  key: 'name',
                  label: '姓名',
                  displayType: 'string'
                },
                {
                  key: 'sex',
                  label: '性别',
                  displayType: 'checkbox',
                  extra: [
                    {
                      label: '男',
                      value: 1
                    },
                    {
                      label: '女',
                      value: 2
                    }
                  ]
                }
              ]
            }
          }
        }
      ]
    }, (err) => {
      if (err) console.log('发生错误');
      resolve()
    })
  })
}
module.exports = initSite