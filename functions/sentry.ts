import * as Sentry from "@sentry/node";
import { NowRequest, NowResponse } from "@now/node";

export default async (req: NowRequest, res: NowResponse) => {
  const { sentrydsn } = process.env;
  Sentry.init({ dsn: sentrydsn });

  if (Math.floor(Math.random() * 100) % 2 === 0) {
    throw new Error("The number wasn't even.");
  }

  res.status(200).json({
    message: "Something, something Sentry"
  });
};
