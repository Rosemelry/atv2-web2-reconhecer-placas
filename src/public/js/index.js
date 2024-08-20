// Função para exibir um alerta
function showAlert(message, type = 'success') {
    const alertContainer = document.getElementById('alert-container');
    alertContainer.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
    alertContainer.classList.remove('hidden');
    setTimeout(() => {
        alertContainer.classList.add('hidden');
    }, 5000); // Oculta o alerta após 5 segundos
}

// Alerta de sucesso no cadastro de placa
document.getElementById('placaForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    const formData = new FormData(this);
    fetch(this.action, {
        method: 'POST',
        body: formData
    }).then(response => {
        if (response.ok) {
            showAlert('Placa cadastrada com sucesso!'); // Exibe alerta de sucesso
            this.reset(); // Reseta o formulário após o cadastro
        } else {
            showAlert('Erro ao cadastrar a placa.', 'error'); // Exibe alerta de erro
        }
    }).catch(error => {
        showAlert('Erro ao cadastrar a placa.', 'error'); // Exibe alerta de erro em caso de falha
        console.error('Erro:', error);
    });
});

// Atualiza o action do formulário de consulta com base na placa
document.getElementById('consultaForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    const placa = document.getElementById('consulta').value;
    if (placa) {
        console.log(placa);
        this.action = `/consulta/${placa}`;
        this.submit(); // Envia o formulário
        showAlert('Consulta realizada com sucesso!'); // Exibe alerta de sucesso
    }
});

document.getElementById('consultaForm2').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio padrão do formulário

    const cidade = document.getElementById('consulta2').value;
    console.log(cidade);
    if (cidade) {
        this.action = `/relatorio/cidade/${cidade}`;
        this.submit(); // Envia o formulário
        showAlert('Relatório gerado com sucesso!'); // Exibe alerta de sucesso
    }
});

// Exibe e oculta resultados após um tempo
function showResults(data) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = data;
    resultsContainer.classList.remove('hidden');
    setTimeout(() => {
        resultsContainer.classList.add('hidden');
    }, 5000); // Oculta após 5 segundos
}

// Exemplo de uso: Mostrar dados na inicialização
document.addEventListener('DOMContentLoaded', () => {
    const queryParams = new URLSearchParams(window.location.search);
    const resultData = queryParams.get('resultData');
    if (resultData) {
        showResults(resultData);
        showAlert('Dados carregados com sucesso!'); // Exibe alerta de sucesso na inicialização
    }
});
