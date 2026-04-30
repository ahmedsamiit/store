const UserRepository = require("../repository/UserRepository");
const bcrypt = require("bcryptjs");

module.exports = {
    login: async (email, password) => {
        const user = await UserRepository.findByEmail(email);

        if (!user || !user.isActive) {
            throw new Error("Invalid email or password");
        }

        const isBcryptHash = user.password.startsWith("$2a$") || user.password.startsWith("$2b$");
        const isPasswordValid = isBcryptHash
            ? await bcrypt.compare(password, user.password)
            : password === user.password;

        if (!isPasswordValid) {
            throw new Error("Invalid email or password");
        }

        return user;
    }
};