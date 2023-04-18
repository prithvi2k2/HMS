const { connectToDatabase } = require('../../../lib/database');
const { PwVerify, genJWT } = require('../../../lib/hasher');
import { serialize } from 'cookie';

export default async function login(req, res) {
    try {
        // Establish/Reuse Database connection
        let { db } = await connectToDatabase();

        // Parse request data
        let { role, _id, pswd, save } = JSON.parse(req.body);

        // Find the user under correct role
        let user = await db.collection(role).findOne({ _id: _id });

        // Verify credentials and return JWT
        if (user) {
            // Verify password
            let authenticated = await PwVerify(user.pswd, pswd)
            
            if (authenticated) {
                delete user.pswd;
                user.role = role;
                // If password matches, generate jwt
                const jwtToken = genJWT(user)

                // Setting httpOnly cookie
                const serialised = serialize("accessToken", jwtToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "strict",
                    maxAge: 60*60*24*7, //Need to verify auto-expiration of cookies
                    path:"/",
                })

                res.setHeader('Set-Cookie', serialised);
                return res.status(200).json({
                    ok: true
                })

            }

            else return res.status(401).json({
                ok: false,
                err: `Password doesn't match. Try again`
            })
        }

        else return res.status(401).json({
            ok: false,
            err: `User not found. Invalid 'Login ID'`
        })
    } catch (error) {
        // returning an error
        return res.status(500).json({
            ok: false,
            err: new Error(`Internal Server Error:` + error).message,
        });
    }
}