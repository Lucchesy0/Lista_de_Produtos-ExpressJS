const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('product_list', 'luchesy', '123456', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize.authenticate()
  .then(() => console.log('Conexão com o banco de dados bem-sucedida!'))
  .catch(err => console.error('Erro ao conectar ao banco:', err));

module.exports = sequelize;
