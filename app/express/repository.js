
const runnerSchema = require('../mongo/schema');

class Repository {

    static async getRunner(id) {
        return await runnerSchema.findById(id);;
    }

    static async addRunner(data) {
        const runner = new runnerSchema(data);
        return await runner.save();
    }

    static async updateRunner(id, data) {
        return await runnerSchema.findByIdAndUpdate(id, data, {new: true});
    }

    static async getBestRunners(data) {
        return await runnerSchema.find(data).sort('-totalDistanceRun');
    }
}

module.exports = Repository;