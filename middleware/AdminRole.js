module.exports = (req, res, next) => {

    if (req.session && req.session.user.role === "admin") {
        return next();
    }else
      res.redirect("/login");
};