import Layout from "../../components/layout"
import { useAppContext } from '../../lib/context';

export default function Dashboard() {
    const { context } = useAppContext();

    return (
        <Layout title='Dashboard'>
            <span className="text-9xl decoration-wavy">
                Welcome,
                <br/>
                {context.username}
            </span>
            <span className="loading loading-ring loading-lg"></span>
        </Layout>
    )
}