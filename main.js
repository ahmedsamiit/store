const express = require('express');
const app = express();
const HBS = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const connectDB = require('./data-source/mongo');
const { AppDataSource } = require('./data-source/mysql');
const authGuard = require('./middleware/auth');
const AdminRoleGuard = require('./middleware/AdminRole');
const csrfProtection = require('./middleware/csrf');
require('dotenv').config();

// Routes
const homeRoutes = require('./routes/home');
const adminRoutes = require('./routes/admin');
const AuthRoutes = require('./routes/auth');

// Create a new express application instance
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(session({
    name: 'sid',
    secret: process.env.SESSION_SECRET || 'loggerv2-dev-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
    },
}));

app.use(csrfProtection);

// Set up Handlebars
app.engine("hbs", HBS.engine({ 
    extname: ".hbs", 
    defaultLayout: "main",
    helpers: {
        eq: (a, b) => a === b
    }
}));

app.set('view engine', 'hbs');
app.set('views', 'views');



app.use("/", homeRoutes);
app.use("/admin", authGuard,AdminRoleGuard, adminRoutes);
app.use("/auth", AuthRoutes);

const port = process.env.PORT || 3000;
const startServer = async () => {
    try {
        // Connect MongoDB (mongoose)
        await connectDB();

        // Connect MySQL (TypeORM)
        if (!AppDataSource.isInitialized) {
            await AppDataSource.initialize();
            console.log('MySQL connected successfully');
        }

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error.message);
        process.exit(1);
    }
};

startServer();