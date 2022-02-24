import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { Text } from '@nextui-org/react'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>gidai-pastprob</title>
        <meta name="description" content="Developed by Keisuke" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <Text
          h1
          size={60}
          css={{
            textGradient: '45deg, $blue500 -20%, $pink500 50%'
          }}
          weight="bold"
        >
          gidai-pastprob.com
        </Text>
      </header>

      <main className={styles.main}>
        <Text h3>岐阜大学過去問サイトへようこそ</Text>
      </main>

      <footer className={styles.footer}>
          Developed by&nbsp;
          <Text b>Keisuke</Text>
      </footer>
    </div>
  )
}

export default Home
