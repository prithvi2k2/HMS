import { serialize } from 'cookie';

export default async function Logout(req, res) {

    const { cookies } = req;
    const token = cookies.accessToken;
    if (!token) {
        return res.status(200).json({
            ok: true,
        })
    }
    else {
        // Removing token by ReSetting cookie to null
        const serialised = serialize("accessToken", null, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: -1,
            path: "/",
        })

        res.setHeader('Set-Cookie', serialised);
        return res.status(200).json({
            ok: true
        })
    }
}