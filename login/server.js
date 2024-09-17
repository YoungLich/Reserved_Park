const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Defina as credenciais no código
const correctUsername = "admin";
const correctPassword = "123456";

// Middleware para permitir envio de dados no body
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos das pastas 'CSS' e 'JS' na raiz do projeto
app.use('/css', express.static(path.join(__dirname, '..', 'CSS')));
app.use('/js', express.static(path.join(__dirname, '..', 'JS')));

// Servir arquivos HTML da raiz do projeto
app.use(express.static(path.join(__dirname, '..')));

// Rota para servir a página de login
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota para processar o login
app.post('/login', (req, res) => {
    const { usernameInput, passwordInput } = req.body;

    // Verifique se o username e a senha estão corretos
    if (usernameInput === correctUsername && passwordInput === correctPassword) {
        // Redireciona para outra página se estiver correto
        res.redirect('/dashboard.html');
    } else {
        // Retorne uma mensagem de erro se as credenciais forem inválidas
        res.send('Credenciais inválidas. Tente novamente.');
    }
});

// Rota para servir páginas HTML adicionais
app.get('/dashboard.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dashboard.html'));
});

app.get('/vagas.html', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'vagas.html'));
});

// Adicione rotas similares para outros arquivos HTML conforme necessário

// Inicie o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
