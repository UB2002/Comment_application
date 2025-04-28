import "reflect-metadata";
import { AppDataSource } from "./data-source";
import "./server";
import { sub } from "./redis";
import { handleReplyCreated } from "./services/notifications";

AppDataSource.initialize()
  .then(() => console.log("Data Source initialized"))
  .catch((err) => console.error("Data Source error", err));

sub.subscribe("reply_created", (_, msg) => {
  if (typeof msg === "string") {
    handleReplyCreated(JSON.parse(msg));
  } else {
    console.error("Invalid message type received:", msg);
  }
});
