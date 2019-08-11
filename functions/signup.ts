import { NowRequest, NowResponse } from "@now/node";

export default async (req: NowRequest, res: NowResponse) => {
  const { email, password } = req.body;

  res.status(200).json({
    message: "You've successfully signed up.",
    validation: `Your email is ${email} and your password is ${password}.`
  });
};
