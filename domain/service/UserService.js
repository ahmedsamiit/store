const UserRepository = require("../repository/UserRepository");

module.exports = {
    getAllUsers: async () => {
        return await UserRepository.findAll();
    },
    getUserById: async (id) => {
        return await UserRepository.findById(id);
    },
    createUser: async (userData) => {
        return await UserRepository.save(userData);
    },
    deleteUser: async (id) => {
        return await UserRepository.delete(id);
    },
    updateUser: async (id, userData) => {
        return await UserRepository.update(id, userData);
    }
};