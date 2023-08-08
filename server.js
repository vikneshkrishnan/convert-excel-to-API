const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const XLSX = require('xlsx');
const User = require('./src/model/user-model');
const excelController = require('./src/controller/excel-controller');
require('dotenv').config()

const app = express();
const port = 3000;


// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))


app.post('/upload', excelController.uploadMiddware, excelController.uploadExcelFile);


app.get('/upload', (req, res) => {
    res.send('<form action="/upload" enctype="multipart/form-data" method="post">' +
        '<input type="file" name="excel"><br>' +
        '<input type="submit" value="Upload">' +
        '</form>');
});
app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`)
});

