const {
  query
} = require("./db.js");
const bcrypt = require("bcrypt");
const data = require("./data.js");
const uuid = require("uuid");

(async () => {
  try {
    const genExtension = `create extension if not exists "uuid-ossp";`;
    const extResult = await query(genExtension, []);

    await createUsersTable();
    await createPagesTable();
    await createPostsTable();
    await createUserPersonalPageTrigger();
    await createPageCreationFunction();
    await createCommentsTable();
    await createFriendsTable();

    const genUsersQuery = await generateUsersQuery(data.users)
    const usersResult = await query(genUsersQuery, []);
    const makeNonPersonalPagesQuery = await createNonPersonalPages();
    const pagesResult = await query(makeNonPersonalPagesQuery, []);

    const genPersonalPostsQuery = await createPostsForPages();
    const postsResult = await query(genPersonalPostsQuery, []);

    const generateCommentForPosts = await createCommentsForPost();
    const commentsCreationResult = await query(generateCommentForPosts, []);
    const makeFriendsQuery = await fillFriendsTable();
    const friendsCreationResult = await query(makeFriendsQuery, []);
    console.log(friendsCreationResult);

  } catch (e) {
    console.log(e);
  }


})();

async function createUsersTable() {
  try {
    const createUsersTable = `drop table if exists users cascade; 
      create table users(
      user_id uuid primary key,
      email text not null,
      password text not null,
      first_name text default 'default_first_name',
      last_name text default 'default_last_name',
      created_at timestamp not null default current_timestamp,
      last_modified timestamp not null default current_timestamp  
    );`
    const result = await query(createUsersTable, []);
    //console.log(result);
    console.log("Users Table Created.");
  } catch (e) {
    console.log(e);
  }
}

async function generateUsersQuery(listOfUsers) {
  //NOTE: If you launch them in different connections you'll run out of connections.
  //Hence the string. SEPT18/2019
  let queryString = ""

  for (let i = 0; i < listOfUsers.length; i++) {
    let user_id = uuid.v4();
    const { email, password, first_name, last_name } = listOfUsers[i];
    let hash = await bcrypt.hash(password, 10);
    let indivUserInsert = `insert into users (
      user_id, 
      email, 
      password, 
      first_name, 
      last_name
    ) values (
      '${user_id}', 
      '${email}', 
      '${hash}', 
      '${first_name}', 
      '${last_name}'
    );`
    queryString += indivUserInsert
  }
  return queryString;

}

async function createUserPersonalPageTrigger() {
  try {
    const userPageTrigger = `create trigger on_user_create_page_create
    after INSERT 
    on users 
    for each row 
    execute procedure create_user_page();
  `;
    const result = await query(userPageTrigger, []);
    console.log('User Page trigger created.')
  } catch (e) {
    console.log(e)
  }


}

async function createPageCreationFunction() {
  try {
    const userPageFunction = `CREATE or REPLACE function create_user_page()
      returns trigger as
    $BODY$
    BEGIN
      insert into pages (page_id, creator_id, name, description, personal) 
      values (uuid_generate_v4(), NEW.user_id, NEW.first_name || ' ' || New.last_name || ' Personal Page', NEW.first_name  || 's page description', true);      
      return new;
    END;
    $BODY$

    LANGUAGE plpgsql VOLATILE
    COST 100;
  `;
    const result = await query(userPageFunction, []);
    console.log(`User Page Creation Function created.`);
  } catch (e) {
    console.log(e);
  }

}


async function createPagesTable() {
  try {
    const createPagesTable = `drop table if exists pages cascade;
    create table pages(
      page_id uuid not null primary key,
      creator_id uuid not null references users(user_id),
      personal boolean not null default false,
      name text not null unique,
      description text not null,
      created_at timestamp not null default current_timestamp,
      last_modified timestamp not null default current_timestamp
    )`;
    const result = await query(createPagesTable, []);

    console.log(`Pages table created.`);
    return result
  } catch (e) {
    console.log(e);
  }
}



async function createPostsTable() {
  try {
    const createPostsTableQuery = `drop table if exists posts cascade;
    create table posts (
      post_id uuid not null primary key,
      user_id uuid references users(user_id),
      page_id uuid references pages(page_id),
      name text default 'post',
      medialink text default 'none',
      content text,
      created_at timestamp not null default current_timestamp,
      last_modified timestamp not null default current_timestamp
    );
  `;
    const result = await query(createPostsTableQuery, []);
    console.log(`POSTS table created.`);
    return result;
  } catch (e) {
    console.log(e);
  }
}

async function createCommentsTable() {
  try {
    const createCommentsTableQuery = `drop table if exists comments cascade; 
      create table comments (
      comment_id uuid not null primary key,
      post_id uuid not null references posts (post_id),
      user_id uuid not null references users (user_id),
      content text not null,
      created_at timestamp not null default current_timestamp,
      last_modified timestamp not null default current_timestamp
    )`;
    const commentsTableResult = await query(createCommentsTableQuery, []);
    return commentsTableResult;
  } catch (e) {
    console.log(e);
  }
}


async function createFriendsTable() {
  const createFriendsTable = `
    drop table if exists friends cascade;
    create table friends(      
      friender_id uuid not null references users(user_id),
      friendee_id uuid not null references users(user_id),
      accepted boolean not null default false,
      created_at timestamp not null default current_timestamp,
      last_modified timestamp not null default current_timestamp,
      check (friender_id != friendee_id),
      primary key(friender_id, friendee_id)
    );  
  `;
  const result = await query(createFriendsTable, []);
  console.log("Friend table created.");
}

async function fillFriendsTable() {
  try {
    const getUsersQuery = `select user_id from users;`;
    const { rows } = await query(getUsersQuery, []);

    let insertionQuery = '';
    const arbitraryLength = 20;
    //NOTE: There are collisions if you make too many friends.
    for (let i = 0; i < arbitraryLength; i++) {

      const { user_id } = rows[i];

      const friendee_id_one = rows[arbitraryLength + 1].user_id;

      const queryPortion = `
      insert into friends(friender_id, friendee_id, accepted)
      values
        ('${user_id}', '${friendee_id_one}', false);        
    `;
      insertionQuery += queryPortion;
    }
    console.log("friends table begin")
    console.log(insertionQuery);
    console.log("friends table end")
    return insertionQuery;
  } catch (e) {
    console.log(`Issue with creating friends insertion query.`);
    console.error(e);
  }
}



async function createNonPersonalPages() {
  const getUsersQuery = `select user_id, first_name, last_name from users;`;
  const { rows } = await query(getUsersQuery, []);

  let insertionQuery = '';
  for (let i = 0; i < rows.length; i++) {
    const { user_id, first_name, last_name } = rows[i];
    const queryPortion = `
      insert into pages(page_id, creator_id, personal, name, description)
      values('${uuid.v4()}', '${user_id}', false, '${first_name} ${last_name}s non-personal page.', 'A non-personal page description is here.');
    `;
    insertionQuery += queryPortion;
  }
  return insertionQuery;
}

async function createPostsForPages() {
  //TODO: I want my Pages to have Posts
  //TODO: On each page, I want multiple users to have made a post.  -- requires(user_id, post_id, page_id)
  const personalsPagesQuery = `select page_id, creator_id 
    from pages
    where personal = true
  `;
  const { rows } = await query(personalsPagesQuery, []);

  let insertPostsToPages = ''
  for (let i = 0; i < rows.length; i++) {
    const { page_id, creator_id } = rows[i];
    const currPost = `
      insert into posts (post_id, user_id, page_id, name, content)
      values 
        ('${uuid.v4()}', '${creator_id}', '${page_id}', 'oh look it is a personal post', 'the content for the personal page.'),
        ('${uuid.v4()}', '${creator_id}', '${page_id}', 'part deux', 'second post on the personal page.'),
        ('${uuid.v4()}', '${creator_id}', '${page_id}', 'third', 'My third post.')
    ;`;
    insertPostsToPages += currPost;
  }
  return insertPostsToPages;
}

async function createCommentsForPost() {
  //TODO: Get all posts.
  //TODO: for each post, insert 3 comments.

  const getAllPosts = `select page_id, post_id, user_id
    from posts    
  `;
  const getAllUsers = `select user_id, first_name, last_name from users`;
  const { rows: postRows } = await query(getAllPosts, []);
  const { rows: userRows } = await query(getAllUsers, []);

  let insertCommentsToPosts = '';
  for (let i = 0; i < postRows.length; i++) {
    const { post_id } = postRows[i];
    const randomUserOne = Math.floor(Math.random() * 100) % userRows.length;
    const randomUserTwo = Math.floor(Math.random() * 101) % userRows.length;
    const randomUserThree = Math.floor(Math.random() * 102) % userRows.length;

    const currComment = `
      insert into comments (comment_id, post_id, user_id, content)
      values 
        ('${uuid.v4()}', '${post_id}', '${userRows[randomUserOne].user_id}', '${userRows[randomUserOne].first_name} arbitrary comment here.'),
        ('${uuid.v4()}', '${post_id}', '${userRows[randomUserTwo].user_id}', '${userRows[randomUserTwo].first_name} random comment here.'),
        ('${uuid.v4()}', '${post_id}', '${userRows[randomUserThree].user_id}', '${userRows[randomUserThree].first_name} curious comment here.')
    ;`;
    insertCommentsToPosts += currComment;
  }
  return insertCommentsToPosts;
}