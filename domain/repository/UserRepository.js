const { AppDataSource } = require("../../data-source/mysql");
const User = require("../models/Users");

const getUserRepository = () => AppDataSource.getRepository(User);

 module.exports = {
    findAll: async () => {
        return await getUserRepository().find();
    },
    findByEmail: async (email) => {
        return await getUserRepository().findOneBy({ email });
    },
    findById: async (id) => {
        return await getUserRepository().findOneBy({ id });
    },
    save: async (userData) => {
        const userRepository = getUserRepository();
        const user = userRepository.create(userData);
        return await userRepository.save(user);
    },
    delete: async (id) => {
        return await getUserRepository().delete(id);
    },
    update: async (id, userData) => {
        return await getUserRepository().update(id, userData);
    }
};