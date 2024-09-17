document.addEventListener('DOMContentLoaded', function () {
    const tabelaPagamentos = document.getElementById('tabela-pagamentos').querySelector('tbody');
    const filtroSelectPagamento = document.getElementById('filtro-pagamento');
    const dataFiltroPagamento = document.getElementById('data-filtro-pagamento');
    const botaoFiltrarPagamentos = document.getElementById('filtrar-pagamentos');
    const listaResumoPagamentos = document.getElementById('lista-resumo-pagamentos');
    const totalReceita = document.getElementById('total-receita');
    const ctxReceitaEstacionamento = document.getElementById('grafico-receita-estacionamento').getContext('2d');

    // Dados fictícios dos pagamentos
    const pagamentos = [
        { nome: 'João da Silva', email: 'joao@email.com', cpf: '000000-00', forma: 'Pix', data: '2023-05-03', hora: '8:00', valor: 50 },
        { nome: 'Maria Souza', email: 'maria@email.com', cpf: '000000-00', forma: 'Crédito', data: '2023-05-04', hora: '7:00', valor: 100 },
        { nome: 'Carlos Lima', email: 'carlos@email.com', cpf: '111111-11', forma: 'Débito', data: '2023-04-15', hora: '9:00', valor: 75 },
        { nome: 'Ana Pereira', email: 'ana@email.com', cpf: '222222-22', forma: 'Pix', data: '2023-04-20', hora: '6:30', valor: 60 }
    ];

    // Função para renderizar a tabela de pagamentos
    function renderPagamentos(filtro) {
        tabelaPagamentos.innerHTML = ''; // Limpa a tabela

        const pagamentosFiltrados = pagamentos.filter(pagamento => {
            const dataPagamento = new Date(pagamento.data);
            const dataFiltroValor = new Date(dataFiltroPagamento.value);

            if (filtro === 'dia') {
                return dataPagamento.toDateString() === dataFiltroValor.toDateString();
            } else if (filtro === 'mes') {
                return (
                    dataPagamento.getMonth() === dataFiltroValor.getMonth() &&
                    dataPagamento.getFullYear() === dataFiltroValor.getFullYear()
                );
            } else if (filtro === 'ano') {
                return dataPagamento.getFullYear() === dataFiltroValor.getFullYear();
            }
        });

        pagamentosFiltrados.forEach(pagamento => {
            const row = ` 
                <tr>
                    <td>${pagamento.nome}</td>
                    <td>${pagamento.email}</td>
                    <td>${pagamento.cpf}</td>
                    <td>${pagamento.forma}</td>
                    <td>${pagamento.data}</td>
                    <td>${pagamento.hora}</td>
                </tr>
            `;
            tabelaPagamentos.insertAdjacentHTML('beforeend', row);
        });

        calcularReceita(pagamentosFiltrados);
    }

    // Função para calcular o resumo de pagamentos por mês
    function calcularResumoPagamentos() {
        const resumo = {};

        pagamentos.forEach(pagamento => {
            const mesAno = new Date(pagamento.data).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long' });

            if (!resumo[mesAno]) {
                resumo[mesAno] = 1;
            } else {
                resumo[mesAno]++;
            }
        });

        listaResumoPagamentos.innerHTML = ''; // Limpa o resumo

        for (const mes in resumo) {
            const item = `<li>${mes}: ${resumo[mes]} pagamento(s)</li>`;
            listaResumoPagamentos.insertAdjacentHTML('beforeend', item);
        }
    }

    // Função para calcular a receita gerada
    function calcularReceita(pagamentos) {
        const total = pagamentos.reduce((acc, pagamento) => acc + pagamento.valor, 0);
        totalReceita.textContent = total.toFixed(2).replace('.', ',');
        atualizarGraficoReceitaEstacionamento();
    }

    // Função para atualizar o gráfico de receita por estacionamento
    function atualizarGraficoReceitaEstacionamento() {
        const receitaPorEstacionamento = {
            'Estacionamento A': pagamentos.filter(pagamento => pagamento.nome === 'João da Silva').reduce((acc, pagamento) => acc + pagamento.valor, 0),
            'Estacionamento B': pagamentos.filter(pagamento => pagamento.nome === 'Maria Souza').reduce((acc, pagamento) => acc + pagamento.valor, 0),
            'Estacionamento C': pagamentos.filter(pagamento => pagamento.nome === 'Carlos Lima').reduce((acc, pagamento) => acc + pagamento.valor, 0),
            'Estacionamento D': pagamentos.filter(pagamento => pagamento.nome === 'Ana Pereira').reduce((acc, pagamento) => acc + pagamento.valor, 0),
        };

        const labels = Object.keys(receitaPorEstacionamento);
        const valores = Object.values(receitaPorEstacionamento);

        new Chart(ctxReceitaEstacionamento, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Receita por Estacionamento',
                    data: valores,
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
    }

    // Evento de clique para filtrar pagamentos
    botaoFiltrarPagamentos.addEventListener('click', function () {
        const filtroSelecionado = filtroSelectPagamento.value;
        if (dataFiltroPagamento.value) {
            renderPagamentos(filtroSelecionado);
        } else {
            alert('Por favor, selecione uma data para filtrar.');
        }
    });

    // Calcular o resumo dos pagamentos e atualizar gráficos ao carregar a página
    calcularResumoPagamentos();
    atualizarGraficoReceitaEstacionamento();
});
