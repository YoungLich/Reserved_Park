// Função para gerar gráfico de crescimento de clientes usando Chart.js
const ctx = document.getElementById('grafico-clientes').getContext('2d');
const graficoClientes = new Chart(ctx, {
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

// Funções de exportação
document.getElementById('exportar-excel').addEventListener('click', function () {
    exportarExcel();
});

document.getElementById('exportar-pdf').addEventListener('click', function () {
    exportarPDF();
});

document.getElementById('exportar-docx').addEventListener('click', function () {
    exportarDOCX();
});

// Função para exportar para Excel (usando SheetJS)
function exportarExcel() {
    let wb = XLSX.utils.book_new();
    let ws_data = [
        ['Tipo', 'Quantidade', 'Valor Total'],
        ['Entradas', document.getElementById('entradas').innerText, ''],
        ['Saídas', document.getElementById('saidas').innerText, ''],
        ['Pagamentos', '', document.getElementById('valor-pagamentos').innerText]
    ];
    let ws = XLSX.utils.aoa_to_sheet(ws_data);
    XLSX.utils.book_append_sheet(wb, ws, "Relatório Mês");
    XLSX.writeFile(wb, 'relatorio_mensal.xlsx');
}

// Função para exportar para PDF (usando jsPDF)
function exportarPDF() {
    let doc = new jsPDF();
    doc.text('Relatório do Mês', 10, 10);
    doc.text('Entradas: ' + document.getElementById('entradas').innerText, 10, 20);
    doc.text('Saídas: ' + document.getElementById('saidas').innerText, 10, 30);
    doc.text('Pagamentos: ' + document.getElementById('valor-pagamentos').innerText, 10, 40);
    doc.save('relatorio_mensal.pdf');
}

// Função para exportar para DOCX (usando docx.js)
function exportarDOCX() {
    let doc = new docx.Document();

    doc.addSection({
        children: [
            new docx.Paragraph({
                text: "Relatório do Mês",
                heading: docx.HeadingLevel.HEADING_1
            }),
            new docx.Paragraph("Entradas: " + document.getElementById('entradas').innerText),
            new docx.Paragraph("Saídas: " + document.getElementById('saidas').innerText),
            new docx.Paragraph("Pagamentos: R$ " + document.getElementById('valor-pagamentos').innerText),
        ]
    });

    docx.Packer.toBlob(doc).then(blob => {
        saveAs(blob, "relatorio_mensal.docx");
    });
}

// Função de filtro por datas
document.getElementById('data-inicial').addEventListener('change', filtrarRelatorio);
document.getElementById('data-final').addEventListener('change', filtrarRelatorio);

function filtrarRelatorio() {
    let dataInicial = document.getElementById('data-inicial').value;
    let dataFinal = document.getElementById('data-final').value;

    if (dataInicial && dataFinal) {
        console.log('Filtrando relatório de ' + dataInicial + ' até ' + dataFinal);
        // Aqui você pode adicionar lógica para buscar dados filtrados por data
    }
}
