

const process = require('process');
let config;
if (process.argv[2] != '') {
	config = require(process.argv[2])
} else {
	config = require('./site.json');
}

const nodePlop = require('node-plop');
const searchModelPath = './template/src/models/searchModel.js';
const projectName = config.site;
const path = require('path');
const plop = nodePlop(`./plopConfig.js`);
const execSync = require('child_process').execSync;




/*path*/
const projectPath = path.join('./output/',projectName);
const basePath = path.join('./output/',projectName,'/src');
const routesPath = path.join('./output/',projectName,'/src/routes');
const modelsPath = path.join('./output/',projectName,'/src/models',projectName);
const imgsPath = path.join('./output/',projectName,'/src/imgs');
const utilsPath = path.join('./output/',projectName,'/src/utils');




const storePath = path.join('./output/',projectName,'/src/models/'+ projectName +'/store.js');
const routesPrtalsPath = path.join('./output/',projectName,'/src/routes/portals.js');
const menuConfigPath = path.join('./output/',projectName,'/src/routes/pages.js');
const extraRoutePath = path.join('./output/',projectName,'/src/routes/extra.js');
const outComponentsPath = path.join('./output/',projectName,'/src','/components');
const outImgsPath = path.join('./output/',projectName,'/src','/imgs');
const outUtilsPath = path.join('./output/',projectName,'/src','/utils');
execSync('rm -rf output');

/*make path*/
// execSync('mkdir -p ' + projectPath);
// execSync('mkdir -p ' + basePath);
execSync('mkdir -p ' + routesPath);
execSync('mkdir -p ' + modelsPath);
execSync('mkdir -p ' + imgsPath);
execSync('mkdir -p ' + utilsPath);
/*move some static compnents*/
execSync('cp -r ' + './template/src/components ' + outComponentsPath);
execSync('cp -r ' + './template/src/imgs ' + basePath);
execSync('cp -r ' + './template/src/utils ' + basePath);
execSync('cp -r ' + './template/src/styles ' + basePath);
execSync('cp -r ' + './template/src/models/api.js ' + path.join(basePath,'models'));


execSync('cp -r ' + './template/package.json ' + projectPath);
execSync('cp -r ' + './template/webpack.config.js ' + projectPath);
execSync('cp -r ' + './template/proxy.config.js ' + projectPath);
execSync('cp -r ' + './template/src/index.less ' + basePath);
execSync('cp -r ' + './template/src/index.html ' + basePath);
/*Some base config */
let store = require('./template/src/pages/store').default;
let extraRoute = [];
store.namespace = projectName;
/*setGenerator*/
  //首页
  plop.setGenerator('indexGenerator', {
    actions: [
    {
      type: 'add',
      path: `output/${projectName}/src/index.js`,
      templateFile: './template/src/index.js'
    },
    {
      type: 'add',
      path: `output/${projectName}/src/routes/pages.js`,
      templateFile: './template/src/routes/pages.jsx'
    },
    {
      type: 'add',
      path: `output/${projectName}/src/routes/portals.js`,
      templateFile: './template/src/routes/portals.jsx'
    },
    ]
 });


/*getGenerator*/

const indexGenerator = plop.getGenerator('indexGenerator');

const src = '../src/';
const fs = require('fs');

let searchModule =  require(searchModelPath).default || require(searchModelPath);
let menuList = [];
function writeJson(pathAndFileName, data) {
	if (typeof data != 'string') {
		data = JSON.stringify(data)
	}
	return new Promise((resolve,reject) => {
		fs.writeFile(pathAndFileName, data, function(err) {
		    if (err) {
		    	console.info(err);
		       reject(err);
		    };
		    resolve({
		    	state: 'success',
		    	file: 'pathAndFileName'
		    })

		});
	})
}


function createTC(config) {
	let Inc = {};
	Inc.initState = {
		current:0,
		total:0,
		data:[]
	}
	Inc.helperStore = projectName;
	Inc.tableHeader = [];
	Inc.searchHead = [];
	store.state.searchForm = {};
	for (let i = 0; i < config.length; i ++ ) {
		store.state.searchForm[config[i].key] = '';
		Inc.tableHeader.push({
	        name: config[i].label,
	        width: 150,
	        dataIndex: config[i].key,
    	})

    	Inc.searchHead.push({
	        field: config[i].key,
	        name: config[i].label,
	        placeholder:config[i].label,
	        type: "input",
	        disabled: false,
	        nameStyle: "",
	        contentStyle:"",
	        width:500,
	        style: {
	            marginRight: 35,
	        },
	        className: "",
	        newRow: true,
	        value: ""
    	})
	}

	return Inc;

}

for (var i = config.site_menus.length - 1; i >= 0; i--) {
	menuList.push(
	 {
        name: config.site_menus[i].menu,
        label: config.site_menus[i].menu_name,
        type: 'PAGE',
        portals: [
            {
            name: config.site_menus[i].menu,
            portalType: config.site_menus[i].menu_url.match(/.*\/(.*)$/)[1].toUpperCase(),
            label: config.site_menus[i].menu_name
            }
        ],

    });
}

let pageModule = [];
let pageAddAction = [];
for (var i = config.site_pages.length - 1; i >= 0; i--) {

	execSync("mkdir -p " + `output/${projectName}/src/portals/${projectName}/${config.site_pages[i].page}`);
	if (config.site_pages[i].page_template == '1') {
	pageModule.push('export const '+ config.site_pages[i].page.toUpperCase()  +' = require("../portals/' + projectName + '/' +  config.site_pages[i].page + '/searchPage");');
		// pageAddAction.push({
	 //      type: 'add',
	 //      path: `output/${projectName}/src/pages/${config.site_pages[i].page}/searchPage.js`,
	 //      templateFile: './template/src/pages/template.js'
  //   	})
		// plop.setGenerator('pageGenerator', {
		//     actions: pageAddAction
		// });
		// let pageGenerator = plop.getGenerator('pageGenerator')
		// pageGenerator.runActions({pgname: config.site_pages[i].page}).then(function(result){
		// 	console.info(result);
		// });
		execSync("cp -r ./template/src/pages/search.js " + `output/${projectName}/src/portals/${projectName}/${config.site_pages[i].page}/searchPage.js`)
		let  inc = createTC(config.site_pages[i].page_config.fields.searchFields);
			 inc.api = config.site_pages[i].page_config.url;
			 inc.crud_url = config.site_pages[i].crud_url;
		writeJson(`output/${projectName}/src/portals/${projectName}/${config.site_pages[i].page}/inc.js`,'export default ' + JSON.stringify(inc));


	} else if (config.site_pages[i].page_template == '2') {
		// extraRoute.push({
		// 	path: config.site_pages[i].page_url + '/:key/:id',
		// 	component: '../portals/' + projectName + '/' + config.site_pages[i].page + '/detailPage.js'
		// })
		//extraRoute.push('routes.push(\<Route path\={\"'+ config.site_pages[i].page_url + '/:key/:id' +'\"}  component={require("' + '../portals/' + projectName + '/' + config.site_pages[i].page + '/detailPage.js'+ '"} />;')
		pageModule.push('export const '+ config.site_pages[i].page.toUpperCase()  +' = require("../portals/' + projectName + '/' +  config.site_pages[i].page + '/detailPage");');
		execSync("cp -r ./template/src/pages/detail.js " + `output/${projectName}/src/portals/${projectName}/${config.site_pages[i].page}/detailPage.js`)
		let inc = {};
		inc.listApi = config.site_pages[i].page_config.url;
		inc.addApi = config.site_pages[i].page_config.url +'/add';
		inc.editApi = config.site_pages[i].page_config.url + '/update';
		inc.initState = {};
		inc.initState.defaultValue = {}
		config.site_pages[i].page_config.fields.showFields.forEach(function(ele){
				inc.initState.defaultValue[ele.key]= '';
		});
		pageAddAction.push({
		  type: 'add',
		  path: `output/${projectName}/src/routes/index.js`,
		  templateFile: './template/src/routes/index.js'
		})
		plop.setGenerator('pageGenerator', {
		    actions: pageAddAction
		});
		let pageGenerator = plop.getGenerator('pageGenerator');

		pageGenerator.runActions({path: config.site_pages[i].page_url + '/:key/:id', component:'../portals/' + `${projectName}/${config.site_pages[i].page}/detailPage.js`}).then(function(result){
			for(var i in result) {
				console.info(result[i]);
			}

		});

		writeJson(`output/${projectName}/src/portals/${projectName}/${config.site_pages[i].page}/inc.js`,'export default ' + JSON.stringify(inc));
	}
}




let modelJson = [];
modelJson.push('{');
/*搜索页配置*/
let searchConfig = config.site_pages[0].page_config.fields.searchFields;
for (var i = 0;i < searchConfig.length ;  i++) {

	if( searchConfig[i].displayType == 'input') {
		modelJson.push('"' + searchConfig[i].key + '"' + ':' + '""');
	} else if (searchConfig[i].displayType == 'checkbox') {
		modelJson.push('"' + searchConfig[i].key + '"' + ':' + searchConfig[i].extra[0].value) ;
	}
	if (i != searchConfig.length -1){
		modelJson.push(',');
	}

}
modelJson.push('}');

searchModule.state.searchForm = JSON.parse(modelJson.join(""));
writeJson(searchModelPath, 'export default ' + JSON.stringify(searchModule));
//excute Generator
indexGenerator.runActions({
	project: projectName
}).then(function(result){
	writeJson(menuConfigPath,'export default' + JSON.stringify(menuList));
	writeJson(routesPrtalsPath,pageModule.join(""));
	writeJson(storePath,'export default ' + JSON.stringify(store));
	writeJson(extraRoutePath,'export default ' + JSON.stringify(extraRoute));

})

//write config to js

// basicAdd.runActions({name: 'test', pgname: 'mm'}).then(function (results) {
//   // do something after the actions have run

//   console.log(results);
// });