const mongoose = require('mongoose')

const ExcelDataSchema = new mongoose.Schema({}, { strict: false });  // This allows saving arbitrary JSON structures without a strict schema

module.exports = mongoose.model('ExcelDataSchema', ExcelDataSchema)