document.getElementById('botao-tema').addEventListener('click', function () {
    const opcoesTema = document.getElementById('opcoes-tema');
    opcoesTema.style.display = opcoesTema.style.display === 'none' || opcoesTema.style.display === '' ? 'block' : 'none';
});

document.getElementById('tema-claro').addEventListener('click', function () {
    document.body.style.backgroundColor = '#ffffff'; // Altere para o fundo claro desejado
    document.body.style.color = '#000000'; // Altere para a cor do texto desejado
    alert('Tema claro ativado');
});

document.getElementById('tema-escuro').addEventListener('click', function () {
    document.body.style.backgroundColor = '#112C6D'; // Altere para o fundo escuro desejado
    document.body.style.color = '#ffffff'; // Altere para a cor do texto desejado
    alert('Tema escuro ativado');
});

document.addEventListener('DOMContentLoaded', function () {
    const salvarPerfilButton = document.getElementById('salvar-perfil');
    const nomeInput = document.getElementById('nome');
    const fotoPerfilInput = document.getElementById('foto-perfil');
    const usuarioNome = document.querySelector('.user-profile h4');
    const usuarioFoto = document.querySelector('.user-profile img');

    salvarPerfilButton.addEventListener('click', function () {
        const nome = nomeInput.value;
        const foto = fotoPerfilInput.files[0];

        if (nome) {
            usuarioNome.textContent = nome;
        }

        if (foto) {
            const reader = new FileReader();
            reader.onload = function (e) {
                usuarioFoto.src = e.target.result;
            };
            reader.readAsDataURL(foto);
        }

        alert('Perfil atualizado com sucesso!');
    });

    const salvarTemaCheckbox = document.getElementById('tema');

    salvarTemaCheckbox.addEventListener('change', function () {
        if (salvarTemaCheckbox.checked) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    });
});
