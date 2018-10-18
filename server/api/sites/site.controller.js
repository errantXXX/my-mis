import mongoose from 'mongoose'
import fs from 'fs';
import path from 'path';
// import { exec } from 'child_process';
import shelljs from 'shelljs';
import send from 'koa-send';

const Site = mongoose.model('Site');
const exportJSON = path.resolve(__dirname, '../../../builder/site.json')
// const appjs = path.resolve(__dirname, '../../../builder/app.js')
// import appjs from '../../../builder/app.js';
const root = path.join(__dirname, '../../../');
const builderPath = path.join(__dirname, '../../../builder/');
const write = (filename, content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, content, (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(console.log('写入完成...'))
    });

  })
}
class SiteController {

  async getList(ctx) {
    try {
      const sites = await Site.find();
      ctx.body = {
        code: 0,
        message: 'success',
        info: {
          siteList: sites.map(k => k.siteInfo),
        },
      };
    } catch (error) {
      ctx.throw(500)
    }
  }

  async editSite(ctx) {
    const { body } = ctx.request;
    try {
      // const site = await Site.findById({ _id: body.id });
      Site.findByIdAndUpdate(body.id, body.values, (err, site) => {
        if (err) {
          throw err
        }
      });
      ctx.body = {
        code: 0,
        message: '修改成功',
        info: {}
      }
    } catch (err) {
      throw err
    }
  }

  async createSite(ctx) {
    const { body } = ctx.request;
    try {
      await Site.create(body, (err, docs) => {
        if (err) {
          throw (err)
        } else {
          console.log(docs)
        }
      });
      ctx.body = {
        code: 0,
        message: '项目新建成功',
        info: {},
      }
    } catch (err) {
      ctx.throw(500)
    }
  }

  async removeSite(ctx) {
    const { body } = ctx.request;
    try {
      await Site.remove({ _id: body.id });
      ctx.body = {
        code: 0,
        message: '删除成功',
        info: {}
      }
    } catch (err) {
      throw (err)
    }
  }

  async exportSite(ctx) {
    let { body } = ctx.request;
    body = JSON.parse(body);
    try {
      const site = await Site.findById({ _id: body.id });
      const siteName = site.site;
      await write(exportJSON, JSON.stringify(site, '', 2))
      shelljs.cd(builderPath);
      if (shelljs.exec('node app.js ./site.json').code !== 0) {
        shelljs.echo('生成失败...');
        shelljs.exit(1)
      } else {
        shelljs.echo('生成完成...')
      }
      if (shelljs.exec(`tar -zcvf ./output/${siteName}.tar ./output/${siteName}`).code !== 0) {
        shelljs.echo('打包失败...');
        shelljs.exit(1)
      } else {
        shelljs.echo('打包完成...')
      }
      const filepath = `output/${siteName}.tar`
      ctx.body = fs.createReadStream(filepath)
      shelljs.cd(`output/${siteName}`);
      shelljs.exec('git init')
      shelljs.exec(`git remote add origin git@ofordcode.ofo.so:ofo-fet/${siteName}.git`)
      shelljs.exec('git config user.name taiguanghui')
      shelljs.exec('git config user.email taiguanghui@ofo.com');
      shelljs.exec('git add .')
      shelljs.exec(`git commit -m "Auto generate by mis-builder at ${new Date()}"`);
      shelljs.exec('git push --force --quiet -u origin master');
      // shelljs.exec(`git push --set-upstream git@ofordcode.ofo.so:1180:305/${siteName}.git master`)
    } catch (err) {
      throw err
    }
  }
}

export default new SiteController();
