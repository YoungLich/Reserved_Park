// dashboard.js

// Dados simulados para teste
const totalVagas = 50;  // Total de vagas no sistema
const vagasDisponiveis = 10;  // Vagas atuais disponíveis
const reservasDia = 5;
const reservasSemana = 25;
const reservasMes = 80;
const receita = 5000;  // Receita gerada em um período
const tempoMedio = 45;  // Tempo médio de permanência (em minutos)
const horarioPico = "18:00";  // Horário de pico
const estacionamentosPopulares = ["Estacionamento A", "Estacionamento B", "Estacionamento C"];

// Atualiza as reservas
function atualizarReservas() {
    document.getElementById('reservas-dia').textContent = reservasDia;
    document.getElementById('reservas-semana').textContent = reservasSemana;
    document.getElementById('reservas-mes').textContent = reservasMes;
}

// Atualiza a taxa de ocupação
function calcularOcupacao() {
    const vagasOcupadas = totalVagas - vagasDisponiveis;
    const ocupacaoPercentual = (vagasOcupadas / totalVagas) * 100;
    document.getElementById('ocupacao-percentage').textContent = ocupacaoPercentual.toFixed(2);
}

// Atualiza a receita gerada
function atualizarReceita() {
    document.getElementById('receita-total').textContent = receita.toFixed(2);
}

// Lista os estacionamentos mais populares
function listarEstacionamentosPopulares() {
    const lista = document.getElementById('lista-populares');
    lista.innerHTML = '';  // Limpa a lista
    estacionamentosPopulares.forEach(nome => {
        const li = document.createElement('li');
        li.textContent = nome;
        lista.appendChild(li);
    });
}

// Atualiza o tempo médio de permanência
function atualizarTempoMedio() {
    document.getElementById('tempo-medio').textContent = tempoMedio;
}

// Atualiza o horário de pico de ocupação
function atualizarHorarioPico() {
    document.getElementById('horario-pico').textContent = horarioPico;
}

// Chama as funções quando a página carrega
document.addEventListener('DOMContentLoaded', function () {
    atualizarReservas();
    calcularOcupacao();
    atualizarReceita();
    listarEstacionamentosPopulares();
    atualizarTempoMedio();
    atualizarHorarioPico();
});

// dashboard.js

document.addEventListener('DOMContentLoaded', function () {
    // Configuração do gráfico de Reservas Totais
    const ctxReservasTotais = document.getElementById('reservasTotaisChart').getContext('2d');
    const reservasTotaisChart = new Chart(ctxReservasTotais, {
        type: 'bar',
        data: {
            labels: ['Hoje', 'Semana', 'Mês'],
            datasets: [{
                label: 'Reservas Totais',
                data: [12, 45, 78], // Substitua com dados reais
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
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

    // Configuração do gráfico de Taxa de Ocupação
    const ctxTaxaOcupacao = document.getElementById('taxaOcupacaoChart').getContext('2d');
    const taxaOcupacaoChart = new Chart(ctxTaxaOcupacao, {
        type: 'doughnut',
        data: {
            labels: ['Ocupado', 'Disponível'],
            datasets: [{
                label: 'Taxa de Ocupação',
                data: [60, 40], // Substitua com dados reais
                backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1
            }]
        }
    });

    // Configuração do gráfico de Receita Gerada
    const ctxReceitaGerada = document.getElementById('receitaGeradaChart').getContext('2d');
    const receitaGeradaChart = new Chart(ctxReceitaGerada, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Receita Gerada (R$)',
                data: [1200, 1500, 1800, 2100, 2400, 2700], // Substitua com dados reais
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
});

