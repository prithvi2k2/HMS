import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'

export default function Home() {
  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>HMS+</title>
          <meta name="description" content="A one-stop Hospital Management System" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to HMS!
          </h1>

          <p className={styles.description}>
            <code className='font-bold'>
              Get started by Logging In↗
            </code>
            <br />
            ⚠NOTE⚠ : This site is still under development. Expect anomalies.
          </p>
        </main>

        <footer className={styles.footer}>
          Created by GitHub@<code>prithvi2k2</code>
        </footer>
      </div>
    </Layout>
  )
}
