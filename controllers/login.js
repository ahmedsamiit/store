const LoginService = require("../domain/service/LoginService");
const SessionService = require("../domain/service/SessionService");

exports.getLogin = async (req, res) => {
    res.render("login", {
        pageTitle: "Login",
    });
};

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await LoginService.login(email, password);
        await SessionService.createUserSession(req, user);
        res.redirect("/");
    } catch (err) {
        console.error(err);
        res.render("login", { 
            pageTitle: "Login",
            error: "Invalid email or password",
            email: email,
        });
    }
};

exports.postLogout = async (req, res) => {
    try {
        await LoginService.logout(req);
        res.redirect("/login");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error logging out");
    }
};  