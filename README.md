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

# Docker Deployment
1. Run the `docker-up.sh` script file in a `git bash` terminal.
2. Wait for the containers to build (will take longer if done for the first time).
3. Go to **Docker Desktop** and you should see 4 containers.

# Configuration (macOS)
### Custom domain
1. Open your terminal and write: sudo nano /etc/hosts.
You'll need to add your MacBook password to access the file

2. Below the default configuration of the file, add the following lines:
**127.0.0.1 <your-frontend-domain>**
**127.0.0.1 <your-api-domain>**

3. Save it using by pressing **control+o** then Enter and exit by pressing **control+x**

### Caddy Certificate
1. Go to your Docker containers, click on your **caddy container** and select the **files** tab

2. You'll see a `data` file. There you navigate like so: **data/caddy/pki/authorities/**
 
3. Select the `root.crt` file and download it to your local machine

4. Go to the **Keychain Access app**, click on **System** and there you'll see the **certificates** tab

5. Go to the top corner of your screen where the configurations are, select **file** and then **import items**

6. Select the `crt` file you downloaded (you'll need to add your password before adding it)

7. This `crt` file will probably not be trusted by your local machine.
To change that, double-click on it and in the **trust section**, change the option in the **When using this certificate** to **always trust**

8. Now, you'll be able to go to your application with your frontend local custom domain.

# Configuration (Windows)
### Custom domain
1. Go to **C:\Windows\System32\drivers\etc\***

2. Click on the `hosts` file (has no file extension) and open it
with a text editor (like `Notepad`)

3. You'll see 2 localhost ports pre-defined. Below them add the following lines (with the spaces):
```bash
#	127.0.0.1       <your-frontend-domain>
#	127.0.0.1       <your-api-domain>
```

### Caddy Certificate
1. Go to your Docker containers, click on your **caddy container** and select the **files** tab

2. You'll see a data file. There you navigate like so: **data/caddy/pki/authorities/**
 
3. Select the `root.crt` file and download it to your local machine

4. Double-click on your `root.crt` and click on **Install Certificate**

5. You'll go the **Certificate Import Wizard** where it'll ask you where to store your certificate.
Choose **Local Machine**

6. Choose the **Place all certificates in the following store option**,
click on **Browse** and select **Trusted Root Certification Authorities**

7. Now, you'll be able to go to your application with your frontend local custom domain.

##### If you want to be sure it worked, search for the `mmc.exe` file and run it as an Administrator
##### Navigate there in the following order:
  1. Go to the **File** tab, select **Add/Remove Snap-in...**

  2. On the left side select **Certificates**, click **Add** and choose **My user account**
  3. Click on OK and you'll see in the left side a snap-in called **Certificates - Current User**
  4. Click on the **Trusted Root Certification Authorities**
  5. There you'll see a **Certificates** folder. Click on it and you'll see the Caddy certificate called `Caddy Local Authority`

### Notes
1. Rebuilding the project after code modification will not affect the custom domain and `crt` file
2. Clearing cache (`docker system prune -a`) will delete all containers.
You'll have to start the **caddy certification configuration** from the beginning