//IMPORTS
const Address = require('../Address');
const User = require('../User');
const Order = require('./Model');

//SERVICE
class Service {
    async donate(req, id) {
        const { date } = req.body;
        try {
            const donation = await Order.create({ collectDate: date[0], collectTime: date[1], donor_id: id, accepted: 0, complete: 0 });
            if(donation) {
                return donation;
            }
            return null;
        } catch (error) {
            return null;
        }
    }

    async getMyDonations(id) {
        try {
            const donations = await Order.findAll({ where: { donor_id: id }, include: { model: User.Model, as: 'donor', include: 'address' } });
            return donations;
        } catch (error) {
            return null;
        }
    }

    async getAllDonations() {
        try {
            const donations = await Order.findAll({where: { complete: 0 }, include: { model: User.Model, as: 'donor', include: 'address' } });
            return donations;
        } catch (error) {
            return null;
        }
    }

    async getMyCollects(collector_id) {
        try {
            const donations = await Order.findAll({ where: { collector_id }, include: { model: User.Model, as: 'donor', include: 'address' } })
            return donations;
        } catch (error) {
            return null;
        }
    }

    async accept(id, collector_id) {
        try {
            const donation = await Order.update({ accepted: 1, collector_id }, { where: { id } });
            return donation;
        } catch (error) {
            return null;
        }
    }

    async complete(id) {
        try {
            const donation = await Order.update({ complete: 1 }, { where: { id } });
            return donation;
        } catch (error) {
            return null;
        }
    }
}

//EXPORTS
module.exports = new Service();