# 📬 Mail Open Tracking POC

A simple and lightweight Proof of Concept (POC) for tracking email opens using a tracking pixel, built with [Hono](https://hono.dev/) and deployed to a public server.  
Tracks when recipients open an email by embedding a transparent pixel and logs the event details to MongoDB.

---

## ✨ Features

- Built with the fast and minimal **Hono** framework.
- Serves a transparent tracking pixel.
- Tracks and logs:
  - Open timestamp
  - IP address
  - User Agent
- Saves open events into MongoDB.
- Sends emails via SMTP with an embedded tracking pixel.
- Configurable via environment variables.

---

## 📁 Folder Structure

```
/
├── src
│   ├── api/                
│   │   ├── track-mail.ts       # Handler for GET /api/v1/track-mail/:id
│   │   ├── send-email.ts       # Handler for POST /api/v1/send-email
│   │   └── get-mail-status.ts  # Handler for GET /api/v1/get-mail-status/:id
│   ├── config/             
│   │   └── db.ts               # MongoDB connection setup
│   ├── model/              
│   │   └── TrackingEvent.ts    # Mongoose schema for tracking events
│   ├── utils/              
│   │   └── mailer.ts           # Nodemailer SMTP setup
│   ├── app.ts                  # Main Hono application
│   └── index.ts                # Server bootstrap
├── .gitignore
├── .env                   
├── README.md
├── bun.lockb
├── package.json
└── tsconfig.json
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory and configure the following:

```env
MONGO_URI=your-mongodb-connection-uri
PORT=your-port (example: 3000)
BASE_URL=https://your-deployed-server.com
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
SMTP_HOST=smtp.yourprovider.com
PASSWORD=some-password(to prevent any random user hitting server)
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/rahulkarmakar28/mail-opentracking-poc.git
cd mail-opentracking-poc
```

### 2. Install dependencies

```bash
bun install
```

### 3. Run the server

```bash
bun run dev
```

The server will start on `http://localhost:3000` (or your configured `PORT`).

---

## 📩 Usage

- **Sending a Test Email**:  
  Send a `POST` request to `/send-email` route to send a test email containing the tracking pixel.

- **Pixel Tracking**:  
  The email body will embed the pixel:

  ```html
  <img src="${BASE_URL}/api/v1/track-mail/${trackingId}" style="display:none;" alt="tracking pixel" />
  ```

  When the recipient opens the email, the server will log the open event to MongoDB.

- **Checking Mail Open Status**:  
  Use the following API to check how many times an email was opened and from which IP addresses:

  ```bash
  GET ${BASE_URL}/get-mail-status/:id
  ```

---

## 🎯 Future Improvements

- Track unique users with query parameters (like `?userId=xyz`).
- Create a simple analytics dashboard.
- Add retry and error handling for email sending.
- Add authentication for protected routes (optional).

---

## 🛡️ License

This project is for educational and demonstration purposes only.  
Use responsibly in accordance with email privacy and GDPR rules.

---

## 🙌 Author

- [Rahul Karmakar](https://github.com/rahulkarmakar28)

---
