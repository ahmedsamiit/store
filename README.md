# Online Maketplace 

## Requirements

- Node.js
- npm
- MySQL
- MongoDB

## 1. Install Dependencies

```bash
npm install
```

## 2. Create `.env`

Create a `.env` file in the project root.

Example:

```env
PORT=3000

MONGO_URI=mongodb://localhost:27017/

DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=app

SESSION_SECRET=change-this-secret

ADMIN_NAME=Admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```

Notes:

- MongoDB uses `MONGO_URI` or `mongoURI`.
- MySQL defaults are defined in `data-source/mysql.js` if env vars are missing.
- Make sure the MySQL database exists before running migrations.

Example MySQL command:

```sql
CREATE DATABASE app;
```

## 4. Run Migrations

```bash
npm run migration:run
```

To revert the latest migration:

```bash
npm run migration:revert
```

## 5. Seed Admin User

Create the first admin user:

```bash
npm run seed:admin
```

Default values come from `.env`:

- `ADMIN_NAME`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

If no env values are set, the fallback is:

- email: `admin@example.com`
- password: `admin123`

## 6. Seed Products

Seed 30 products:

```bash
npm run seed:products
```

Seed a custom number:

```bash
npm run seed:products -- 50
```

Clear all products:

```bash
npm run seed:products:clear
```

## 7. Run The Project

```bash
npm start
```

The server runs on:

```text
http://localhost:3000
```

## Main Pages

- Home page: `http://localhost:3000/`
- Login page: `http://localhost:3000/login`
- Admin dashboard: `http://localhost:3000/admin`
- Product CRUD: `http://localhost:3000/admin/products`
- Admin users CRUD: `http://localhost:3000/admin/AdminUsers`

## Login Flow

1. Visit `/login`.
2. Login with an admin user.
3. Admin users are redirected to `/admin`.
4. Seller users are redirected to `/admin/sellers`.
5. Customer users are redirected to `/`.

## CSRF Protection

The app uses session-based CSRF protection.

Protected requests include critical POST actions such as:

- login
- logout
- create/update/delete products
- create/update/delete users

Forms must include:

```hbs
<input type="hidden" name="_csrf" value="{{csrfToken}}">
```

The middleware also accepts the token from the `x-csrf-token` header.

## Useful Commands

```bash
npm start
npm run migration:run
npm run migration:revert
npm run seed:admin
npm run seed:products
npm run seed:products -- 50
npm run seed:products:clear
```

## Project Structure

```text
controllers/       Request handlers
data-source/       MongoDB and MySQL connections
domain/models/     TypeORM entity schemas
domain/repository/ Data access layer
domain/service/    Business/session/login services
middleware/        Auth, admin role, CSRF middleware
migrations/        TypeORM migrations
routes/            Express routes
seeders/           Admin/product seed scripts
views/             Handlebars views
public/            Static CSS
```
