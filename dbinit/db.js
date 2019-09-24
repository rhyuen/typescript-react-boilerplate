const {
    Client
} = require("pg");
const result = require("dotenv").config();

if (result.error) {
    //TIL: So it seems that DOTENV's default option only works when the .env file is in the root.
    throw new Error(result.error);
}

const {
    ts_pg_user_faas,
    ts_pg_host_faas,
    ts_pg_dbname_faas,
    ts_pg_password_faas
} = process.env;



exports.query = (text, params) => {


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
                console.log("ERROR in DB Conn.");
                console.log(e);
            })
            .then(() => {
                console.log(`[${new Date().toLocaleString()}]: Killing DBConn`);
                client.end();
            });
    });
};