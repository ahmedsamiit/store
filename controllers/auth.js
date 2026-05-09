const AuthService = require("../domain/service/AuthService");
const SessionService = require("../domain/service/SessionService");

exports.getLogin = async (req, res) => {
    res.render("login", {
        pageTitle: "Login",
    });
};

exports.postLogin = async (req, res) => {
    const { email, password } = req.validatedBody;

    try {
        const user = await AuthService.login(email, password);
        await SessionService.createUserSession(req, user);
        res.redirect("/");
    } catch (err) {
        res.status(401).render("login", {
            pageTitle: "Login",
            error: "Invalid email or password",
            email: email,
        });
    }
};

exports.postLogout = async (req, res) => {
    try {
        await AuthService.logout(req);
        res.redirect("/login");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error logging out");
    }
};  