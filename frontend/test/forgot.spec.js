const axios = require("axios");
const targetURL = "http://localhost:9000/api/forgot";
const signupURL = "http://localhost:9000/api/signup";

describe("Forgotten Email", async () => {
    let emailForTest = "";
    beforeAll(async () => {
        emailForTest = `forgotemail${Math.floor(Math.random() * 1000)}@forgot.ca`;
        const email = emailForTest;
        const password = "password"
        const first_name = "Forgot";
        const last_name = "My Email";
        const res = await axios.post(signupURL, {
            email,
            password,
            first_name,
            last_name
        });
    });

    test("it should send an email", async (done) => {
        const res = await axios.post(targetURL, {
            email: emailForTest
        });
        expect(res.status).toEqual(200);
        expect(res.data.validation).toEqual(`Your password email reset will be arriving shortly at '${emailForTest}'.`);
        done();
    });

    test("Email of non-registered user provided", async (done) => {

        const res = await axios.post(targetURL, {
            email: "unregistered@email.ca"
        });
        expect(res.status).toBe(200);
        expect(res.data.validation).toEqual(`Provided you've registered previously, your password reset email will be arriving shortly at 'unregistered@email.ca'.`);
        done();

    });

    test("Fail, Invalid Email Provided", async (done) => {
        try {
            await axios.post(targetURL, {
                email: "invalidemail"
            })
        } catch (e) {
            expect(e.response.status).toEqual(400);
            expect(e.response.data.validation).toBe("Invalid email address sent.");
            done();
        }
    });
});