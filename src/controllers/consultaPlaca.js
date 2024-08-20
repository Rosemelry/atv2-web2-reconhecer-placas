const CadastroPlaca = require("../models/cadastroPlacaModels");

const consultaPlaca = async (req, res) => {
  try {
    const { placa } = req.params;

    // Procurar placa no banco de dados
    const registros = await CadastroPlaca.find({ placa: placa });

    if (registros.length > 0) {
      // Retorna os detalhes das placas encontradas
      res.status(200).json({
        success: true,
        dados: registros
      });
    } else {
      // Informa que a placa não foi encontrada
      res.status(404).json({ mensagem: 'Placa não encontrada!' });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      mensagem: 'Erro ao consultar placa.',
      error: error.message
    });
  }
};

module.exports = { 
  consultaPlaca,
};
