const { Model, DataTypes } = require('sequelize');

class Address extends Model {
    static init(connection) {
        super.init({
            street: DataTypes.STRING,
            number: DataTypes.STRING,
            neighborhood: DataTypes.STRING,
            zipCode: DataTypes.STRING,
            userId: DataTypes.INTEGER
        }, {
            sequelize: connection
        });
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
        this.belongsTo(models.Order, { foreignKey: 'userId', as: 'address' });
    }
}

module.exports = Address;