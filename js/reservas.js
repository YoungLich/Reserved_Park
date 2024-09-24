// Função para contar reservas por dia
function contarReservasPorDia(reservas) {
    const contagemPorDia = {};

    reservas.forEach(reserva => {
        const dataChegada = reserva.chegada;
        if (contagemPorDia[dataChegada]) {
            contagemPorDia[dataChegada]++;
        } else {
            contagemPorDia[dataChegada] = 1;
        }
    });

    return contagemPorDia;
}

// Função para gerar gráfico de reservas por dia
function gerarGraficoReservas() {
    const contagemPorDia = contarReservasPorDia(reservas);

    const ctx = document.getElementById('grafico-clientes').getContext('2d');

    const labels = Object.keys(contagemPorDia);
    const data = Object.values(contagemPorDia);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Reservas por Dia',
                data: data,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1,
                fill: true,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                }
            },
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
        }
    });
}

// Chama a função para gerar o gráfico ao carregar a página
window.onload = function () {
    gerarGraficoReservas();
};
