// 初始化数据库
const initSite = require('./site')
const initUser = require('./user');
const initTempate = require('./template');

;(async () => {
    await initSite();
    await initUser();
    await initTempate();
    process.on('exit', (code) => {
        console.log(`数据初始完毕~`);
    });
    process.exit()
})()
