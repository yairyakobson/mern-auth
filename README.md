# Introduction
A simple MERN authentication application.

Technology stack:
**Server:** Built in NodeJS, expresss, mongoose and TypeScript.
Used Zod for schema validation

**Client:** Built in React+TypeScript via Vite and used TailwindCSS for styling.
**Database:** Used MongoDB to store data.
**State Management:** Used the [react-query](https://www.npmjs.com/package/react-query) library

Features:
1. Authentication via email and password.
2. Mailing system for email verification and resetting password (via Nodemailer and Gmail).
3. Access to your current and previous sessions (authenticated users only).


# Nodemailer and Gmail configurations
1. Go to your Google account and in the search bar, type **app passwords**
2. Give your application a name and click on create
3. After your application was created, a 16-digit code will appear ONLY ONCE.

4. Create a `.env` file in your backend directory and give it the following environment variables:

> SMTP_HOST = `smtp.gmail.com`
>     SMTP_PORT = 465
>     SMTP_EMAIL = <your-email-address>
>     SMTP_PASSWORD = <16-digit-application-code>
>     SMTP_FROM_NAME = <application-name>
>     SMTP_FROM_EMAIL = `<somedemomail@mail.com>`


# Running Instructions!

1. Create 2 `.env` files: one for the backend and one for the frontend

2. In the `.env` file of the backend directory, create an environment variable and give it the value of `http://localhost:5173` (5173 = Vite's port)

3. To the same in the `.env` file of the frontend directory, but with the value of the port your server runs on (if you run the server on port 8000 the value needs to be `http://localhost:8000`)

4. Open 2 separate terminals: one for the backend and one for the frontend.

5. Type `npm run dev` on both terminals.