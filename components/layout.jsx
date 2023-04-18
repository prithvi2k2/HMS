// Default page layout
import Head from "next/head"
import Navbar from "./navbar"

export default function Layout({title, children, theme, ...props}){
    return <div>
        <Head>
            <title>{title}</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar/>
        <main>
            {children}
        </main>
        {/* <Footer/> */}
    </div>
}