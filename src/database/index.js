//IMPORTS
const { Sequelize } = require('sequelize');

//DATABASE CONFIG
const { db } = require('../config/index');

//MODEL IMPORTS
const { User, Address, Order } = require('../components');

//CREATE CONNECTION
const connection = new Sequelize(db);

//INIT MODELS
User.Model.init(connection);
Address.Model.init(connection);
Order.Model.init(connection);

//INIT RELATIONS
User.Model.associate(connection.models);
Address.Model.associate(connection.models);
Order.Model.associate(connection.models);

//EXPORTS
module.exports = connection;