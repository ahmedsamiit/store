const bcrypt = require("bcryptjs");
const UserService = require("../domain/service/UserService");

exports.getUsers = async (req, res) => {
    try {
        const users = await UserService.getAllUsers();

        res.render("admin", {
            pageTitle: "Admin - Users",
            activeTab: "AdminUsers",
            products: [],
            users,
            haveUsers: users.length > 0,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
};

exports.postCreateUser = async (req, res) => {
    const { name, email, password, role, isActive } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        await UserService.createUser({
            name,
            email,
            password: hashedPassword,
            role,
            isActive: isActive === "true",
        });

        res.redirect("/admin/AdminUsers");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating user");
    }
};

exports.postUpdateUser = async (req, res) => {
    const { id, name, email, password, role, isActive } = req.body;

    try {
        const userData = {
            name,
            email,
            role,
            isActive: isActive === "true",
        };

        if (password) {
            userData.password = await bcrypt.hash(password, 10);
        }

        await UserService.updateUser(id, userData);
        res.redirect("/admin/AdminUsers");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating user");
    }
};

exports.postDeleteUser = async (req, res) => {
    const { id } = req.body;

    try {
        await UserService.deleteUser(id);
        res.redirect("/admin/AdminUsers");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting user");
    }
};
