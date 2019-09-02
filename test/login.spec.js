const axios = require("axios");
const targetURL = "http://localhost:3000/api/login";
describe("login", () => {

    test("Login Success", async () => {

        const res = await axios.post(targetURL, {
            email: "robin@robin.ca",
            password: "password"
        })
        expect(res.data.message).toBe("Your email is 'robin@robin.ca' and your password is 'password'.")

    });

    test("Login Failure -- No Email", async () => {
        try {
            const res = await axios.post(targetURL, {
                hero: "batman"
            });
        } catch (e) {
            expect(e.response.status).toEqual(400);
            expect(e.response.data.message).toMatch("There's no email field in your request.");
        }
    });

    test("Login Failure -- Email without Password", async () => {
        try {
            const res = await axios.post(targetURL, {
                email: "batman@batman.ca"
            });
        } catch (e) {
            expect(e.response.status).toEqual(400);
            expect(e.response.data.message).toBe("There's no password field in your request.")
        }
    });

    test("Login Failure -- Invalid Email Value.", async () => {
        try {
            const res = await axios.post(targetURL, {
                email: "batman@batman",
                password: "password"
            });
        } catch (e) {
            expect(e.response.status).toEqual(400);
            expect(e.response.data.message).toBe("Invalid email address.");
        }
    });

    test("Login Failure -- Non-existent user", async () => {
        try {
            const res = await axios.post(targetURL, {
                email: "superman@dc.ca",
                password: "password",
            });
        } catch (e) {
            expect(e.response.status).toEqual(404);
            expect(e.response.data.message).toBe("User doesn't exist.");
        }

    });

    test("Login Failure -- Valid User, Invalid Password", async () => {
        try {
            const res = await axios.post(targetURL, {
                email: "robin@robin.ca",
                password: "invalidpassword",
            });
        } catch (e) {
            expect(e.response.status).toEqual(400);
            expect(e.response.data.message).toBe("Invalid password.");
        }
    })
})