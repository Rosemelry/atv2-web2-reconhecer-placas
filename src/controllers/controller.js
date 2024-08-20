const home = (req, res) => {
    res.status(200).render('index', {
        cidade: 'Crato-CE', // Valor padrão para cidade
        placa: 'BRA2E19'   // Valor padrão para placa
    });
};

module.exports = {
    home
};
