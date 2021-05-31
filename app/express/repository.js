
const runnerSchema = require('../mongo/schema');

class Repository {

    static async getRunner(id) {
        return await schema.findById(id);;
    }

    static async addRunner(data) {
        const runner = new runnerSchema(data);
        return await runner.save();
    }

    static async updateRunner(id, data) {
        return await schema.findByIdAndUpdate(id, data, {new: true});
    }
}

module.exports = Repository;