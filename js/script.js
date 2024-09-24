document.addEventListener('DOMContentLoaded', function () {
  const links = document.querySelectorAll('.navigation a');
  const contentArea = document.getElementById('content-area');

  let vagas = 10; // Exemplo de número de vagas disponíveis inicialmente.

  // Função para carregar a página
  function loadPage(targetFile) {
    fetch(targetFile)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao carregar o conteúdo');
        }
        return response.text();
      })
      .then(html => {
        contentArea.innerHTML = html;

        // Se o dashboard foi carregado, atualizar a quantidade de vagas
        if (targetFile === 'dashboard.html') {
          updateVagas();
        }
      })
      .catch(error => {
        console.error('Erro:', error);
        contentArea.innerHTML = '<p>Não foi possível carregar o conteúdo.</p>';
      });
  }

  // Atualiza o número de vagas disponíveis
  function updateVagas() {
    const vagasDisponiveisElement = document.getElementById('vagas-disponiveis');
    if (vagasDisponiveisElement) {
      vagasDisponiveisElement.textContent = vagas;
    }
  }

  // Simulação da alteração das vagas disponíveis a cada 5 segundos
  setInterval(function () {
    vagas = Math.max(0, vagas - Math.floor(Math.random() * 2)); // Reduz vagas de maneira aleatória
    updateVagas();
  }, 5000);

  // Carregar dashboard.html automaticamente ao abrir a página
  loadPage('dashboard.html');

  // Adicionar evento de clique nos links de navegação
  links.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      // Remover a classe "active" de todos os itens da lista
      links.forEach(l => l.parentElement.classList.remove('active'));

      // Adicionar a classe "active" ao item clicado
      this.parentElement.classList.add('active');

      // Carregar o conteúdo do arquivo HTML correspondente
      const targetFile = this.getAttribute('data-target');
      if (targetFile) {
        loadPage(targetFile);
      }
    });
  });

  document.querySelectorAll('.seat input[type="checkbox"]').forEach(function (checkbox) {
    checkbox.addEventListener('change', function () {
      const status = checkbox.getAttribute('data-status');
      if (checkbox.checked) {
        if (status === 'available') {
          checkbox.nextElementSibling.style.backgroundColor = 'green';
        } else if (status === 'occupied') {
          checkbox.nextElementSibling.style.backgroundColor = 'red';
        } else if (status === 'maintenance') {
          checkbox.nextElementSibling.style.backgroundColor = 'yellow';
        } else {
          checkbox.nextElementSibling.style.backgroundColor = 'gray';
        }
      } else {
        // Reseta a cor ao estado original
        checkbox.nextElementSibling.style.backgroundColor = '';
      }
    });
  });

  // Função para mostrar o alerta
  function mostrarAlerta() {
    document.getElementById('alerta').style.display = 'block';
  }

  // Função para confirmar a saída (Sim)
  function confirmado() {
    alert('Você saiu.'); // Mensagem de saída ou outra ação de logout
    document.getElementById('alerta').style.display = 'none';  // Esconder o alerta
    window.location.href = 'login.html';  // Redirecionar para a página de login ou qualquer outra ação de logout
  }

  // Função para cancelar a saída (Não)
  function cancelado() {
    document.getElementById('alerta').style.display = 'none';  // Esconder o alerta
  }

  // Atribuir a função de mostrar o alerta ao clicar no botão "Sair"
  document.querySelector('.navigation a[onclick="mostrarAlerta()"]').addEventListener('click', mostrarAlerta);

});