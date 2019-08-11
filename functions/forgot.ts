import { NowRequest, NowResponse } from "@now/node";

export default async (req: NowRequest, res: NowResponse) => {
  const { email } = req.body;
  console.log(email);
  res.status(200).json({
    message: "email page",
    validation: `Your email for resetting your password is ${email}.`
  });
};
