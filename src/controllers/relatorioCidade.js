const PDFDocument = require('pdfkit');
const CadastroPlaca = require('../models/cadastroPlacaModels');

async function gerarRelatorio(req, res) {
  try {
    const { cidade } = req.params;

    if (!cidade) {
      return res.status(400).json({ msg: "Cidade é um campo obrigatório" });
    }

    // Buscar dados no banco de dados
    const dados = await CadastroPlaca.find({
      nomeCidade: new RegExp(cidade, "i"),
    });

    if (dados.length === 0) {
      return res.status(404).json({ msg: "Nenhum registro encontrado para a cidade especificada." });
    }

    // Criação do documento PDF
    const doc = new PDFDocument();
    const nome = `relatorio${Date.now()}.pdf`;

    // Configuração de cabeçalho para download do PDF
    res.setHeader('Content-Disposition', `attachment; filename="${nome}"`);
    res.setHeader('Content-Type', 'application/pdf');


    // Enviar o PDF como resposta
    doc.pipe(res);

    // Adicionar conteúdo ao PDF
    doc.fontSize(18).text(`Atividade 02 web II N1:`, {
      align: 'center'
    });

    doc.moveDown();
    doc.moveDown();

    doc.fontSize(16).text(`Relatório de Placas - Cidade: ${cidade}`, {
      align: 'center'
    });


    dados.forEach((registro, index) => {
      doc.fontSize(12).text(`Registro ${index + 1}:`, { underline: true });
      doc.fontSize(10).text(`Cidade: ${registro.nomeCidade}`);
      doc.fontSize(10).text(`Placa: ${registro.placa}`);
      doc.fontSize(10).text(`Data: ${registro.data}`);
      doc.fontSize(10).text(`Caminho da Imagem: ${registro.caminhoImagem}`);
      doc.moveDown(); // Espaçamento entre registros
    });

    // Finalizar o PDF e fechar o fluxo de resposta
    doc.end();

    console.log("Relatório criado e enviado com sucesso!");
  } catch (error) {
    console.error('Erro ao gerar o relatório:', error);
    if (!res.headersSent) {
      res.status(500).json({ msg: "Erro ao gerar o relatório", error: error.message });
    }
  }
}

module.exports = {
  gerarRelatorio,
};
