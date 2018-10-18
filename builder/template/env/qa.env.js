const API_CONFIG = {
  node_env: '_QA_',
  debug: false,
  mock: false,
  // sh deploy_qa.sh qa1
  apibase: 'http://qatest.api.ofo.com/',
  // sh deploy_qa.sh qa2
  // apibase: 'http://10.6.26.226:5901/',
  // sh deploy_qa.sh qa3
  // apibase: 'http://10.6.26.226:5902/',
};
if(process.env.SERVER_ENV) {
  Object.assign(API_CONFIG, {
    apibase: `http://${process.env.SERVER_ENV}/`
  });
}
module.exports = API_CONFIG;
