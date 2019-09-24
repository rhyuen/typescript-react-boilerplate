import { NowRequest, NowResponse } from "@now/node";
import Cookies from "cookies";


export default async (req: NowRequest, res: NowResponse) => {
    try {
        console.log("Do something with the cookies.");
        console.log(req.cookies);

        return res.status(200).json({
            message: `Logging out.`
        });
    } catch (e) {
        console.log(`${e.message} |||| ${e.lineNumber} |||| ${e.stack}`);
        return res.status(500).json({
            message: "Something has gone wrong with the signout.",
            description: e
        });
    }
};
