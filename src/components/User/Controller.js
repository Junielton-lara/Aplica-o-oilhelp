//IMPORTS
const Service = require('./Service');

//CONTROLLER CONFIG
class Controller {
    async save(req, res) {
        const user = await Service.save(req);
        if(user != null) {
            return res.status(201).json(user);
        }
        return res.status(400).json({ message: "The message" });
    }
};

//EXPORTS
module.exports = new Controller();