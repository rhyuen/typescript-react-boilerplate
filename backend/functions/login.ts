import { NowRequest, NowResponse } from "@now/node";
import { query } from "./db/index";
import getEnv from "./mw/getEnv";
import Cookies from "cookies";
import * as Sentry from "@sentry/node";
import * as jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

type UserResult = {
  email: string;
  password: string;
};

async function loadSentry() {
  const { sentrydsn } = process.env;
  console.log(`LOADING SENTRY: ${sentrydsn}`);
  Sentry.init({ dsn: sentrydsn });
}

export default async (req: NowRequest, res: NowResponse) => {
  try {
    if (!process.env.jwtsigningkey) {
      throw new Error(
        "You're missing the JWT Signing Key in your Environment Variables."
      );
    }

    await loadSentry();

    if (!req.body.email) {
      return res.status(400).json({
        message: "There's no email field in your request."
      });
    }

    if (!req.body.password) {
      return res.status(400).json({
        message: "There's no password field in your request."
      });
    }

    //Checks For Empty Email/Password
    if (req.body.email === "" || req.body.password === "") {
      return res.status(400).json({
        message: "Invalid email address and/or password."
      });
    }

    const { email, password } = req.body;

    //check for invalid email
    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Invalid email address."
      });
    }

    const result: any = await query(
      "select user_id, email, password from users where email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      console.log("User doesn't exist.");
      return res.status(404).json({
        message: "User doesn't exist."
      });
    }

    const firstRow: UserResult = result.rows[0];
    const checkPassword = await bcrypt.compare(password, firstRow.password);
    console.log(checkPassword);

    if (!checkPassword) {
      return res.status(400).json({
        message: "Invalid password."
      });
    }

    const payload = { user: result.rows[0].email, scope: "All" };
    const token = await jwt.sign(payload, process.env.jwtsigningkey, {
      algorithm: "HS256"
    });

    // const currentCookie = new Cookies(req, res, { keys: ["key is here"] });
    // currentCookie.set("token", token);

    setCookie(req, res, "login", token)


    return res.status(200).json({
      message: `Your email is '${email}' and your password is '${password}'.`,
      token: token
    });
  } catch (e) {
    console.log(`Error Handler for Login.ts: DETAILS: ${e}`);
    return res.status(500).json({
      message: "Something has gone wrong.",
      description: e
    });
  }
};


function setCookie(req: NowRequest, res: NowResponse, name: string, value: string) {
  const signingKey = getEnv('jwtsigningkey');
  const cookies = new Cookies(req, res, {
    keys: [signingKey]
  });
  const options = {
    signed: true,
    secure: false,
    httpOnly: true,
    path: "/",
    maxAge: 3000000
  };
  cookies.set(name, value, options);
};
