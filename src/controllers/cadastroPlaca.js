const CadastroPlaca = require("../models/cadastroPlacaModels");
const { getOCR } = require("../api/ocr");

const cadastroPlaca = async (req, res) => {
  try {
    const { cidade } = req.body;

    // Verifique se o arquivo foi enviado
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Nenhum arquivo foi enviado.",
      });
    }

    if (!cidade) {
      return res.status(400).json({
        success: false,
        message: "Nome da cidade é obrigatório.",
      });
    }

    // Obtenha o nome original do arquivo
    const fileName = req.file.originalname;

    // Realize a leitura OCR da placa (Se necessário)
    const placaOCR = await getOCR(req.file.buffer);

    // Verifique se a placa já está cadastrada
    const placaExistente = await CadastroPlaca.findOne({ placa: placaOCR, nomeCidade: cidade });

    if (placaExistente) {
      return res.status(409).json({
        success: false,
        message: "Essa placa já foi cadastrada nessa cidade!",
      });
    }

    // Crie um novo registro de placa
    const novaPlaca = new CadastroPlaca({
      nomeCidade: cidade,
      placa: placaOCR,
      // Apenas o nome do arquivo sem armazenamento
      caminhoImagem: fileName, 
    });

    await novaPlaca.save();

    res.status(201).json({
      success: true,
      message: "Dados cadastrados com sucesso!",
      data: novaPlaca,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Erro ao cadastrar os dados.",
      error: error.message,
    });
  }
};

module.exports = {
  cadastroPlaca,
};
