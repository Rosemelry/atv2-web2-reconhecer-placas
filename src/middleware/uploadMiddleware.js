// const multer = require('multer');
// const path = require('path');

// const storage = multer.diskStorage({
//   destination: './src/public/uploads/',
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({
//   storage: storage,
// });

const multer = require('multer');

// Configuração do Multer para armazenar arquivos na memória
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = upload;



