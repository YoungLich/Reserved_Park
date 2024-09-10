document.addEventListener('DOMContentLoaded', function () {
    const tabelaPagamentos = document.getElementById('tabela-pagamentos').querySelector('tbody');
    const filtroSelectPagamento = document.getElementById('filtro-pagamento');
    const dataFiltroPagamento = document.getElementById('data-filtro-pagamento');
    const botaoFiltrarPagamentos = document.getElementById('filtrar-pagamentos');
    const listaResumoPagamentos = document.getElementById('lista-resumo-pagamentos');

    // Dados fictícios dos pagamentos
    const pagamentos = [
        { nome: 'João da Silva', email: 'joao@email.com', cpf: '000000-00', forma: 'Pix', data: '2023-05-03', hora: '8:00' },
        { nome: 'Maria Souza', email: 'maria@email.com', cpf: '000000-00', forma: 'Crédito', data: '2023-05-04', hora: '7:00' },
        { nome: 'Carlos Lima', email: 'carlos@email.com', cpf: '111111-11', forma: 'Débito', data: '2023-04-15', hora: '9:00' },
        { nome: 'Ana Pereira', email: 'ana@email.com', cpf: '222222-22', forma: 'Pix', data: '2023-04-20', hora: '6:30' }
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

    // Evento de clique para filtrar pagamentos
    botaoFiltrarPagamentos.addEventListener('click', function () {
        const filtroSelecionado = filtroSelectPagamento.value;
        if (dataFiltroPagamento.value) {
            renderPagamentos(filtroSelecionado);
        } else {
            alert('Por favor, selecione uma data para filtrar.');
        }
    });

    // Calcular o resumo dos pagamentos ao carregar a página
    calcularResumoPagamentos();
});
