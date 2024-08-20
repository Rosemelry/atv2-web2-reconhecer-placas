const express = require("express");
const { home} = require("../controllers/controller");
const { cadastroPlaca } = require("../controllers/cadastroPlaca");
const upload = require("../middleware/uploadMiddleware");
const { gerarRelatorio } = require("../controllers/relatorioCidade");
const { consultaPlaca } = require('../controllers/consultaPlaca');
const rotas = express.Router();

rotas.get('/',home);
rotas.get('/relatorio/cidade/:cidade', gerarRelatorio);
rotas.post('/cadastroPlaca', upload.single('placa'), cadastroPlaca);
rotas.get('/consulta/:placa', consultaPlaca);

module.exports=rotas;