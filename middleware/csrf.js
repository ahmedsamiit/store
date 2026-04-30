const crypto = require("crypto");

const SAFE_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

const getTokenFromRequest = (req) => req.body?._csrf || req.get("x-csrf-token");

module.exports = (req, res, next) => {
    if (!req.session) {
        return res.status(500).send("Session is required for CSRF protection");
    }

    if (!req.session.csrfToken) {
        req.session.csrfToken = crypto.randomBytes(32).toString("hex");
    }

    res.locals.csrfToken = req.session.csrfToken;

    if (SAFE_METHODS.has(req.method)) {
        return next();
    }

    const requestToken = getTokenFromRequest(req);

    if (!requestToken || requestToken !== req.session.csrfToken) {
        return res.status(403).send("Invalid CSRF token");
    }

    return next();
};
