import { Client } from "pg";

const {
  ts_pg_user_faas,
  ts_pg_host_faas,
  ts_pg_dbname_faas,
  ts_pg_password_faas
} = process.env;

export const query = (text: string, params: Array<string>) => {
  return new Promise((resolve, reject) => {
    const client = new Client({
      user: ts_pg_user_faas,
      host: ts_pg_host_faas,
      database: ts_pg_dbname_faas,
      password: ts_pg_password_faas,
      port: 5432
    });

    client
      .connect()
      .then(() => {
        return client.query(text, params);
      })
      .then(res => {
        resolve(res);
      })
      .catch(e => {
        console.log("db.index: ERROR in the DB Error Handler.");
        console.log(e);
      })
      .then(() => {
        console.log("db.index: Killing Connection");
        client.end();
      });
  });
};
