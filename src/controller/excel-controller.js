const multer = require('multer')
const XLSX = require('xlsx')
const ExcelData = require('../model/excel-model')

const fs = require('fs');
const path = require('path');

const uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, uploadsDir) // Use the 'uploadsDir' variable we defined earlier
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname)
//     }
// });
// const upload = multer({storage: storage})

const storage = multer.memoryStorage();
const upload = multer({storage: storage});

exports.uploadExcelFile = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded')
        }
        const workbook = XLSX.read(req.file.buffer, {type: 'buffer'});
        if (!workbook) {
            return res.status(400).send('Error parsing the Excel File')
        }

        if (!workbook.SheetNames ?? workbook.SheetNames.length === 0) {
            return res.status(400).send('The excel file does have any sheets')
        }
        const sheetName = workbook.SheetNames[0];
        const workSheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(workSheet);

        // Saving to MongoDB
        ExcelData.insertMany(jsonData).then(() => {
            console.log("Success")
        }).catch((err) => {
            console.log(err)
        })
    } finally {
        res.status(201).send("Created")

    }
};

exports.uploadMiddware = upload.single('excel')