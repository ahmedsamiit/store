const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const renderLoginWithErrors = (res, { errors, email }) => res.status(422).render("login", {
    pageTitle: "Login",
    errors,
    email,
});

exports.validateLogin = (req, res, next) => {
    const errors = {};
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = typeof req.body.password === "string" ? req.body.password : "";

    if (!email) {
        errors.email = "Email is required";
    } else if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
        errors.email = "Enter a valid email address";
    }

    if (!password) {
        errors.password = "Password is required";
    } else if (password.length < 6) {
        errors.password = "Password must be at least 6 characters";
    } else if (password.length > 128) {
        errors.password = "Password is too long";
    }

    if (Object.keys(errors).length > 0) {
        return renderLoginWithErrors(res, { errors, email });
    }

    req.validatedBody = {
        email,
        password,
    };

    return next();
};
