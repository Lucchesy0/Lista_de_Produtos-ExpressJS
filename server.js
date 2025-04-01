const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const productRoutes = require('./routes/productRoutes');

const app = express();
const PORT = 3000;

// Serve arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use('/api/produtos', productRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
