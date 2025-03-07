import * as dotenv from "dotenv";
import app from "./server";

dotenv.config();

app.listen(3000, () => {
  console.log("server started at http://localhost:3000");
});
