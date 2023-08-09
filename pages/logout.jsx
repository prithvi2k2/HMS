import Layout from '../components/layout'
import { useAppContext } from '../lib/context'
import { useRouter } from "next/router"
import { useEffect } from 'react'

export default function Logout() {
    const router = useRouter()
    const { resetContext } = useAppContext();
    useEffect(() => {
        const logout = async () => {
            // Destroy cookies, end session
            let res = await fetch('api/auth/logout', {
                method: 'GET',
            }).then(data => data.json())
            if (res.ok) {
                localStorage.removeItem('state')
                resetContext()
                router.push('/login')
            }
        }
        logout()
    }, [])

    return (
        <Layout>
            <div className='flex h-screen justify-center items-center'>
                <button className="btn">
                    <span className="loading loading-spinner"></span>
                    logging out
                </button>

            </div>
        </Layout>
    )
}   