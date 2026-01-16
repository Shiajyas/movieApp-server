import "reflect-metadata"; // MUST be first


import { PORT } from "../config/env";
import app from "./http/app";


import "../infra/container";

async function start() {


  app.listen(PORT, () =>
    console.log(`Server running on port ${PORT}`)
  );
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
