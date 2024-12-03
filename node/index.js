require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 8000;

let server;

async function startServer() {
  try {
    server = app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
    process.on("unhandledRejection", (err) => {
      // eslint-disable-next-line no-console
      console.log("UNHANDLED REJECTION! 💥 Shutting down...");
      // eslint-disable-next-line no-console
      console.log(err.name, err.message);
      server.close(() => {
        process.exit(1);
      });
    });
  } catch (error) {
    console.log(`Error in starting server. Error: ${error}`);
  }
}

startServer();
