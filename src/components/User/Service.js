//IMPORTS
const User = require('./Model');
const bcrypt = require('bcrypt');
const Address = require('../Address');

//SERVICE
class Service {
    async save(req, res) {
        let { firstName, lastName, email, password, password2, role, street, number, neighborhood, zipcode } = req.body;
        try {
            if(password == password2) {
                password = await bcrypt.hash(password, 10);
            } else {
                return null;
            }
            const user = await User.create({
                firstName,
                lastName,
                email,
                password,
                role
            });
            let address = { street, number, neighborhood, zipCode: zipcode, userId: user.getDataValue('id') };
            const newAddress = await Address.Model.create(address);
            return await { ...user.toJSON(), address: newAddress.toJSON() };
        } catch (error) {
            return null;
        }
    }

    async login (req) {
        const { email, password } = req.body;
        try {
            const user = await User.findOne({ where: { email } });
            if(user) {
                const hash = user.getDataValue('password');
                let isMatch = await bcrypt.compare(password, hash);
                if(isMatch) {
                    return { role: user.getDataValue('role'), id: user.getDataValue('id') };
                }
                return null;
            }
            return null;
        } catch (error) {
            console.log(error)
            return null;
        }
    }

    async getOne(id) {
        try {
            const user = await User.findOne({ where: { id }, include: { association: 'address' } });
            if(user) {
                return user.toJSON();
            }
            return null;
        } catch (error) {
            return null;
        }
    }

    async update(req, id) {
        let { firstName, lastName, email, password, password2, street, number, neighborhood, zipcode } = req.body;
        try {
            if(password == password2 && password != '') {
                password = await bcrypt.hash(password, 10);
                const user = await User.update({
                    firstName,
                    lastName,
                    email,
                    password,
                    address: {
                        street,
                        number,
                        neighborhood,
                        zipCode: zipcode
                    }
                },
                { where: { id } });
                return user;
            } else if(password == '') {
                const user = await User.update({
                    firstName,
                    lastName,
                    email,
                    address: {
                        street,
                        number,
                        neighborhood,
                        zipCode: zipcode
                    }
                },
                { where: { id } });
                return user;
            }
            return null;

        } catch (error) {
            return null;
        }
    }
}

//EXPORTS
module.exports = new Service();