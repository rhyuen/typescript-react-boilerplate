import { NowRequest, NowResponse } from "@now/node";
import * as Sentry from "@sentry/node";
import { hash } from "bcrypt";
import { isEmail } from "validator";
import { query } from "./db/index";
import { v4 } from "uuid";

export default async (req: NowRequest, res: NowResponse) => {
  try {
    const { sentrydsn } = process.env;
    Sentry.init({ dsn: sentrydsn });

    const { email, password, first_name, last_name } = req.body;
    if (!email || !password || !first_name || !last_name) {
      return res.status(400).json({
        message: `You're missing at least one of email, password, first_name or last_name.`
      });
    }

    if (!isEmail(email)) {
      return res.status(400).json({
        message: `'${email}' is not a valid email.`
      });
    }

    const duplicateEmailCheck: any = await query(
      `select * from users where email = $1`,
      [email]
    );
    console.log("START");
    console.log(duplicateEmailCheck);
    console.log("END");

    if (duplicateEmailCheck.rows.length !== 0) {
      console.log("Duplicate email check");
      return res.status(200).json({
        confirmation: `You've successfully signed up.  You should be receiving a confirmation email shortly.`
      });
    }

    const hashedPassword = await hash(password, 10);

    const result = await query(
      `insert into users(
      user_id, email, password, first_name, last_name
      ) values ($1, $2, $3, $4, $5)`,
      [v4(), email, hashedPassword, first_name, last_name]
    );

    console.log(result);

    return res.status(200).json({
      confirmation: `You've successfully signed up using the email address: '${email}'.`
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: "An error has occurred.",
      description: e
    });
  }
};
