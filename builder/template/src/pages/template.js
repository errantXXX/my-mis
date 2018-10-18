
/**
 * {{ properCase pgname }} page
 *  created by 褚甜;
 *  any issues please mail chutian@ofo.com;
 */

module.exports = {
  name: '{{ camelCase pgname }}',
  label: '模板生成',
  type: 'PAGE',
  portals: [{
    name: '{{ camelCase pgname }}',
    portalType: '{{ upperCase pgname }}',
    label: '模板生成',
    dataMap: (json) => {
      return json.info;
    },
    //api: '{{ camelCase pgname }}/get_list',
  }],
}
