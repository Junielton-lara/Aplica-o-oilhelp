const { Model, DataTypes } = require('sequelize');

class User extends Model {
    static init(connection) {
        super.init({
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            role: DataTypes.STRING,
        }, {
            sequelize: connection
        });
    }

    static associate(models) {
        this.hasOne(models.Address, { foreignKey: 'userId', as: 'address'} );
        this.hasMany(models.Order, { foreignKey: 'donor_id', as: 'donor'} );
        this.hasMany(models.Order, { foreignKey: 'collector_id', as: 'collector'} );
    }
}

module.exports = User;