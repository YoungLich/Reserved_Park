// reservas.js
document.addEventListener('DOMContentLoaded', function () {
    const tabelaReservas = document.getElementById('tabela-reservas');
    const filtroSelect = document.getElementById('filtro');
    const dataFiltro = document.getElementById('data-filtro');
    const botaoFiltrar = document.getElementById('filtrar-reservas');

    // Dados fictícios das reservas
    const reservas = [
        { nome: 'João da Silva', email: 'joao@email.com', chegada: '2023-05-01', partida: '2023-05-03', vaga: '1A' },
        { nome: 'Maria Souza', email: 'maria@email.com', chegada: '2023-05-02', partida: '2023-05-04', vaga: '1B' },
        { nome: 'Carlos Lima', email: 'carlos@email.com', chegada: '2023-04-01', partida: '2023-04-02', vaga: '2A' }
    ];

    // Função para exibir as reservas na tabela
    function renderReservas(filtro) {
        tabelaReservas.innerHTML = ''; // Limpar a tabela

        const reservasFiltradas = reservas.filter(reserva => {
            const dataChegada = new Date(reserva.chegada);
            const dataFiltroValor = new Date(dataFiltro.value);

            if (filtro === 'dia') {
                return dataChegada.toDateString() === dataFiltroValor.toDateString();
            } else if (filtro === 'mes') {
                return (
                    dataChegada.getMonth() === dataFiltroValor.getMonth() &&
                    dataChegada.getFullYear() === dataFiltroValor.getFullYear()
                );
            } else if (filtro === 'ano') {
                return dataChegada.getFullYear() === dataFiltroValor.getFullYear();
            }
        });

        reservasFiltradas.forEach(reserva => {
            const row = `
                <tr>
                    <td>${reserva.nome}</td>
                    <td>${reserva.email}</td>
                    <td>${reserva.chegada}</td>
                    <td>10:00</td>
                    <td>${reserva.partida}</td>
                    <td>18:00</td>
                    <td>${reserva.vaga}</td>
                </tr>
            `;
            tabelaReservas.insertAdjacentHTML('beforeend', row);
        });
    }

    // Evento de clique para o botão de filtrar
    botaoFiltrar.addEventListener('click', function () {
        const filtroSelecionado = filtroSelect.value;
        if (dataFiltro.value) {
            renderReservas(filtroSelecionado);
        } else {
            alert('Por favor, selecione uma data para filtrar.');
        }
    });

    // Dados fictícios adicionais
    const cancelamentos = 5;
    const noShows = 2;
    document.getElementById('cancelamentos').textContent = cancelamentos;
    document.getElementById('no-shows').textContent = noShows;

    const clientesFiéis = [
        { nome: 'João da Silva', reservas: 6 },
        { nome: 'Maria Souza', reservas: 5 }
    ];

    const listaClientes = document.getElementById('clientes-fieis');
    clientesFiéis.forEach(cliente => {
        const listItem = document.createElement('li');
        listItem.textContent = `${cliente.nome} - ${cliente.reservas} reservas`;
        listaClientes.appendChild(listItem);
    });

    // Função para gerar gráficos (exemplo usando Chart.js)
    function gerarGraficoDemografia() {
        var ctx = document.getElementById('demografia-chart').getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['João da Silva', 'Maria Souza', 'Carlos Lima'],
                datasets: [{
                    label: 'Idade dos Usuários',
                    data: [25, 30, 40],
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
                }]
            }
        });
    }

    function gerarGraficoAtividades() {
        var ctx = document.getElementById('atividades-chart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Janeiro', 'Fevereiro', 'Março'],
                datasets: [{
                    label: 'Reservas por Mês',
                    data: [10, 15, 7],
                    backgroundColor: '#36A2EB'
                }]
            }
        });
    }

    gerarGraficoDemografia();
    gerarGraficoAtividades();
});
