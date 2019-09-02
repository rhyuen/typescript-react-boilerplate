const axios = require("axios");
const targetURL = "http://localhost:3000/api/signup";

describe("Signup", () => {
    test("It should create a new user.", async () => {
        const generatedEmail = `batman_${Math.floor(Math.random() * 1000)}@authed.ca`;
        const res = await axios.post(targetURL, {
            email: generatedEmail,
            password: "password",
            first_name: "Bruce",
            last_name: "Wayne"
        });

        expect(res.status).toEqual(200);
        expect(res.data.confirmation).toBe(`You've successfully signed up using the email address: '${generatedEmail}'.`);
    });

    test("Fail, No Email Field Present", async () => {
        try {
            await axios.post(targetURL, {
                password: "password",
                first_name: "Bruce",
                last_name: "Wayne"
            });
        } catch (e) {
            expect(e.response.status).toEqual(400);
            expect(e.response.data.message).toBe(`You're missing at least one of email, password, first_name or last_name.`);
        }
    });

    test("Fail, No Password Field Present", async () => {
        try {
            const generatedEmail = `batman_${Math.floor(Math.random() * 1000)}@authed.ca`;
            await axios.post(targetURL, {
                email: generatedEmail,
                first_name: "Bruce",
                last_name: "Wayne"
            });
        } catch (e) {
            expect(e.response.status).toEqual(400);
            expect(e.response.data.message).toBe(`You're missing at least one of email, password, first_name or last_name.`);
        }
    });

    test("Fail, Invalid Email", async () => {
        const invalidEmail = "batmanIsTheBest";
        try {
            await axios.post(targetURL, {
                email: invalidEmail,
                password: "password",
                first_name: "Bruce",
                last_name: "Wayne"
            });
        } catch (e) {
            expect(e.response.status).toEqual(400);
            expect(e.response.data.message).toBe(`'${invalidEmail}' is not a valid email.`);
        }
    });

    test("It should reject because that Identifier is already used.", async () => {
        try {
            const generatedEmail = `superman${Math.floor(Math.random() * 1000)}@superman.ca`;
            await axios.post(targetURL, {
                email: generatedEmail,
                password: "password",
                first_name: "Clark",
                last_name: "Kent"
            });
            const res = await axios.post(targetURL, {
                email: generatedEmail,
                password: "password",
                first_name: "Clark",
                last_name: "Kent"
            });

            expect(res.status).toEqual(200);
            expect(res.data.confirmation).toBe("You've successfully signed up.  You should be receiving a confirmation email shortly.");
        } catch (e) {
            console.log(e);
        }
    });


    test.skip("It should fail because Password it too short.", async () => {

    });
});