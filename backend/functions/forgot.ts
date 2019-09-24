import { NowRequest, NowResponse } from "@now/node";
import { query } from "./db/index";
import validator from "validator";

export default async (req: NowRequest, res: NowResponse) => {
  try {
    if (!req.body.email) {
      return res.status(400).json({
        message: "No email field provided in request."
      });
    }

    const { email } = req.body;

    console.log(email);

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        validation: `Invalid email address sent.`
      });
    }

    const result: any = await query("select * from users where email = $1", [
      email
    ]);
    if (result.rows.length === 0) {
      //TODO: LOG non-registered email
      //TODO: DO NOT SEND EMAIL
      return res.status(200).json({
        validation: `Provided you've registered previously, your password reset email will be arriving shortly at '${email}'.`
      });
    }

    return res.status(200).json({
      validation: `Your password email reset will be arriving shortly at '${email}'.`
    });
  } catch (e) {
    return res.status(500).json({
      message: `Something has gone wrong with our Forgotten Email system.`
    });
  }
};
