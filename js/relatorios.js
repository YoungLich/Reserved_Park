// Função para gerar gráficos com Chart.js
const ctxClientes = document.getElementById('grafico-clientes').getContext('2d');
const graficoClientes = new Chart(ctxClientes, {
    type: 'line',
    data: {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto'],
        datasets: [{
            label: 'Número de Clientes',
            data: [30, 50, 40, 60, 80, 70, 90, 100],
            borderColor: 'rgba(0, 123, 255, 0.8)',
            fill: false,
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

const ctxNovosUsuarios = document.getElementById('grafico-novos-usuarios').getContext('2d');
const graficoNovosUsuarios = new Chart(ctxNovosUsuarios, {
    type: 'bar',
    data: {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto'],
        datasets: [{
            label: 'Novos Usuários',
            data: [10, 20, 15, 25, 30, 35, 40, 50],
            backgroundColor: 'rgba(0, 123, 255, 0.2)',
            borderColor: 'rgba(0, 123, 255, 0.8)',
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

const ctxRetencao = document.getElementById('grafico-taxa-retencao').getContext('2d');
const graficoRetencao = new Chart(ctxRetencao, {
    type: 'pie',
    data: {
        labels: ['Retidos', 'Não Retidos'],
        datasets: [{
            label: 'Taxa de Retenção dos Usuários',
            data: [75, 25],
            backgroundColor: ['rgba(0, 123, 255, 0.2)', 'rgba(255, 99, 132, 0.2)'],
            borderColor: ['rgba(0, 123, 255, 0.8)', 'rgba(255, 99, 132, 0.8)'],
            borderWidth: 1
        }]
    }
});

const ctxIncidentes = document.getElementById('grafico-incidentes').getContext('2d');
const graficoIncidentes = new Chart(ctxIncidentes, {
    type: 'bar',
    data: {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto'],
        datasets: [{
            label: 'Incidentes',
            data: [2, 4, 3, 5, 6, 4, 3, 2],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 0.8)',
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
