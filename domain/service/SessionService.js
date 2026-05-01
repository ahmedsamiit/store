const regenerateSession = (req) => new Promise((resolve, reject) => {
    req.session.regenerate((err) => {
        if (err) {
            reject(err);
            return;
        }

        resolve();
    });
});

const saveSession = (req) => new Promise((resolve, reject) => {
    req.session.save((err) => {
        if (err) {
            reject(err);
            return;
        }

        resolve();
    });
});

const destroySession = (req) => {
    if (!req.session) {
        return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
        req.session.destroy((err) => {
            if (err) {
                reject(err);
                return;
            }

            resolve();
        });
    });
};

module.exports = {
    getUser: (req) => {
        if (!req.session || !req.session.user) {
            return null;
        }

        return req.session.user;
    },
    createUserSession: async (req, user) => {
        const csrfToken = req.session.csrfToken;

        await regenerateSession(req);

        if (csrfToken) {
            req.session.csrfToken = csrfToken;
        }

        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        };

        await saveSession(req);
    },
    destroySession,
};
