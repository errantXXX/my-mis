import mongoose from 'mongoose'


const Template = mongoose.model('Template')

class TemplateController {

  async getList(ctx) {
    const list = await Template.find()
    ctx.body = {
      code: 0,
      message: 'success',
      info: {
        list,
      }
    }
  }
}

export default new TemplateController()