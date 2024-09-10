document.addEventListener('DOMContentLoaded', function () {
    const tabelaReservas = document.getElementById('tabela-reservas');
    const filtroSelect = document.getElementById('filtro');
    const dataFiltro = document.getElementById('data-filtro');
    const botaoFiltrar = document.getElementById('filtrar-reservas');

    // Dados fictícios das reservas (pode ser substituído por uma chamada de API)
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
                    <td>10:00</td> <!-- Pode adicionar o horário dinâmico -->
                    <td>${reserva.partida}</td>
                    <td>18:00</td> <!-- Pode adicionar o horário dinâmico -->
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
});
