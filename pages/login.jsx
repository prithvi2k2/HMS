import Layout from "../components/layout";
import { loginForm, labl, inp, sel } from '../styles/Forms.module.css'
import { useState } from "react";
import { useRouter } from "next/router"
import { useAppContext } from "../lib/context";
import { FaRegTimesCircle } from 'react-icons/fa';

export default function Login() {
    const router = useRouter(); // Router to redirect after successful login
    const { updateContext } = useAppContext();
    const [role, setRole] = useState();
    const [uid, setUid] = useState();
    const [pswd, setPswd] = useState();
    // `save` used for keeping the user signed in for longer period of time [Not implemented yet]
    const [save, setSave] = useState(false);
    // store error message to render proper state
    const [error, setError] = useState();
    // LoginBtn to toggle various states
    const btn = [
        { text: 'Log In', loading: null, },
        { text: 'Logged In', loading: 'loading', }
    ]
    const [loginBtn, setLoginBtn] = useState(btn[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (role && uid && pswd) {
            let payload = {
                role: role,
                _id: uid,
                pswd: pswd,
                // save: save // Why am i even sending this to the server?
            }

            let res = await fetch('api/auth/login', {
                method: 'POST',
                body: JSON.stringify(payload),
            }).then(data => data.json())

            if (res.ok) {
                setLoginBtn(btn[1])
                // Reset error
                setError();
                // Update context
                updateContext({ loggedin: true, username: uid, role: role })
                // Redirect
                router.push(`/${role}/dashboard`);
            }
            else {
                setError(res.err);
                setLoginBtn(btn[0])
            }
        }
        else {
            alert('Invalid payload')
        }
    }

    return <Layout title="Login">
        <form className={loginForm} onSubmit={handleSubmit}>
            <label className={labl}>
                Role
                <select className={sel} onChange={e => setRole(e.target.value)} value={role || ''} required>
                    <option value="" defaultValue hidden>select your role</option>
                    <option value="admin">Super Admin</option>
                    <option value="hospitals">Hospital/Clinic Admin</option>
                    <option value="specialistSr">Senior Radiologist</option>
                    <option value="specialistJr">Radiologist</option>

                </select>
            </label>
            <label className={labl}>
                Login ID
                <input className={inp} type="text" value={uid || ''} onChange={e => setUid(e.target.value)}
                    autoComplete="on" placeholder="your UNIQUE login id" required />
            </label>
            <label className={labl}>
                Password
                <input className={inp} type="password" value={pswd || ''} onChange={e => setPswd(e.target.value)}
                    autoComplete="on" placeholder="your password" required />
            </label>
            <label className="flex gap-2 select-none">
                <input className="checkbox checkbox-accent" type="checkbox" 
                value={save} onChange={e => setSave(e.target.checked)} />
                 Keep me signed-in
            </label>
            <button className={`btn btn-primary btn-lg ${loginBtn.loading}`} type="submit">{loginBtn.text}</button>
            {
                error ? <div className="alert alert-error shadow-lg max-w-xs">
                    <div>
                        <FaRegTimesCircle />
                        <span>{error}</span>
                    </div>
                </div> : null
            }
        </form>
    </Layout>
}