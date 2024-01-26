require('dotenv').config();
const user_email = process.env.USER_EMAIL;
const user_password = process.env.USER_PASSWORD;
const admin_email = process.env.ADMIN_EMAIL;
const admin_password = process.env.ADMIN_PASSWORD;
const SecretKey = process.env.SECRET_KEY;
const authPort = process.env.AUTH_PORT;
const backendPort = process.env.BACKEND_PORT;

const app = require('./server.js');

// Kontrollera om nödvändiga miljövariabler finns
const requiredEnvVariables = ['USER_EMAIL', 'USER_PASSWORD', 'ADMIN_EMAIL', 'ADMIN_PASSWORD', 'SECRET_KEY', 'AUTH_PORT', 'BACKEND_PORT'];

for (const envVar of requiredEnvVariables) {
  if (!process.env[envVar]) {
    console.error(`Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
}

app.listen(authPort, () => {
    console.log(`HTTP server listening on port ${authPort}`);
});
