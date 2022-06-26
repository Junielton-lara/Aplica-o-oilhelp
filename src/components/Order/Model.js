const { Model, DataTypes } = require('sequelize');

class Order extends Model {
    static init(connection) {
        super.init({
            'collectTime': DataTypes.TIME,
            'collector_id': DataTypes.INTEGER,
            'donor_id': DataTypes.INTEGER,
            'collectDate': DataTypes.DATE,
            'complete': DataTypes.INTEGER,
            'accepted': DataTypes.INTEGER,

        }, {
            sequelize: connection
        });
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'collector_id', as: 'collector' });
        this.hasOne(models.Address, { foreignKey: 'userId', as: 'address' });
        this.belongsTo(models.User, { foreignKey: 'donor_id', as: 'donor' });
    }
}

module.exports = Order;