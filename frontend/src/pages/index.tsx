import type { NextPage } from "next"
import Head from "next/head"
import styles from "../styles/Home.module.css"
import Link from "next/link"

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Fullstack Challenge</title>
        <meta name="description" content="Fullstack challenge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div>
          <Link className="landing-page-button" href="/companies">
            Companies
          </Link>
          <Link className="landing-page-button" href="/deals">
            Deals
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Home
