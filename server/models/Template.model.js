'use strict'
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TemplateSchema = new Schema({
  temp_name: String,
  temp_id: String,
  temp_components: Object,
})


const Template = mongoose.model('Template', TemplateSchema)
export default Template
