const {
  query
} = require("./db.js");

(async () => {
  const createTable = `drop table if exists users cascade; 
    create table users(
    user_id uuid primary key,
    email text not null,
    password text not null,
    first_name text default 'default_first_name',
    last_name text default 'default_last_name',
    created_at timestamp not null default current_timestamp,
    last_modified timestamp not null default current_timestamp  
  );`
  const result = await query(createTable, []);

  console.log(result);
})();