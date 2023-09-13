import * as thinky from "thinky";

const dbConfig = {
  host: "localhost",
  port: 28015,
  db: "instakilo_likes_db",
};

const thinkyInstance = thinky(dbConfig);

export { thinkyInstance as thinky };
