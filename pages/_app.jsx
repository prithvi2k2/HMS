import '../styles/globals.css'
import { AppWrapper } from '../lib/context'

export default function App({ Component, pageProps }) {
    return (
        <AppWrapper>
            <Component {...pageProps} />
        </AppWrapper>
    )
}