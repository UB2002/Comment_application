import "reflect-metadata";
import { AppDataSource } from "./data-source";
import "./server";
import { sub } from "./redis";
import { handleReplyCreated } from "./services/notifications";

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
    process.exit(1); // Exit the process if initialization fails
  });

sub.subscribe("reply_created", (_, msg) => {
  if (typeof msg === "string") {
    handleReplyCreated(JSON.parse(msg));
  } else {
    console.error("Invalid message type received:", msg);
  }
});
