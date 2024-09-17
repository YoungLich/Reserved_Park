document.addEventListener('DOMContentLoaded', () => {
    // Dados de exemplo - você deve substituir por dados reais
    const dados = {
        vagasDisponiveis: 120,
        localizacaoVagas: 'Piso 1, Seção A, Filas 1-10',
        tempoMedioPermanencia: [30, 45, 60, 20, 35, 50, 40],
        taxaOcupacao: [60, 70, 80, 65, 75, 90, 85],
        estacionamentosPopulares: ['A1', 'B2', 'C3', 'D4', 'E5'],
        picosOcupacao: [10, 15, 25, 20, 30, 40, 35]
    };

    // Preencher dados de gestão de espaço
    document.getElementById('num-vagas-disponiveis').querySelector('span').textContent = dados.vagasDisponiveis;
    document.getElementById('localizacao-vagas').querySelector('span').textContent = dados.localizacaoVagas;

    // Preencher lista de estacionamentos populares
    const ul = document.getElementById('estacionamentos-populares');
    dados.estacionamentosPopulares.forEach(vaga => {
        const li = document.createElement('li');
        li.textContent = vaga;
        ul.appendChild(li);
    });

    // Gráfico de Tempo Médio de Permanência
    const ctxTempoMedio = document.getElementById('tempo-medio').getContext('2d');
    new Chart(ctxTempoMedio, {
        type: 'bar',
        data: {
            labels: ['1A', '2B', '3C', '4D', '5E', '6F', '7G'],
            datasets: [{
                label: 'Tempo Médio (minutos)',
                data: dados.tempoMedioPermanencia,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Gráfico de Taxa de Ocupação
    const ctxTaxaOcupacao = document.getElementById('taxa-ocupacao').getContext('2d');
    new Chart(ctxTaxaOcupacao, {
        type: 'line',
        data: {
            labels: ['Hora 1', 'Hora 2', 'Hora 3', 'Hora 4', 'Hora 5', 'Hora 6', 'Hora 7'],
            datasets: [{
                label: 'Taxa de Ocupação (%)',
                data: dados.taxaOcupacao,
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Gráfico de Picos de Ocupação
    const ctxPicosOcupacao = document.getElementById('picos-ocupacao').getContext('2d');
    new Chart(ctxPicosOcupacao, {
        type: 'pie',
        data: {
            labels: ['Manhã', 'Tarde', 'Noite'],
            datasets: [{
                label: 'Picos de Ocupação',
                data: dados.picosOcupacao,
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
                borderWidth: 1
            }]
        }
    });
});

