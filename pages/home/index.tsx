import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { Text, Button, Spacer, Card, Grid, Collapse } from '@nextui-org/react'
import { withAuthenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import Header from '../../components/header'
import Footer from '../../components/footer'

const Home: NextPage<{ user: any, signOut: any }> = ({ user, signOut }: { user: any, signOut: any }) => {
  const colors = [
    'primary',
    'secondary',
    'success',
    'warning',
    'error',
    'gradient'
  ];

  const information = [
    {
      faculty: "工学部",
      department: ["電気電子・工学科", "機械工学科", "化学・生命工学科"],
      color: "primary",
    },
    {
      faculty: "応用生物科学部",
      department: ["生産環境科学科", "応用生命科学科"],
      color: "secondary",
    },
    {
      faculty: " 地域科学部 ",
      department: ["地域政策学科", "地域文化学科"],
      color: "success",
    }
  ]

  return (
    <div className={styles.container}>
      <Head>
        <title>gidai-pastprob</title>
        <meta name="description" content="Developed by Keisuke" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={styles.main}>
        <Text h3>岐阜大学過去問サイトへようこそ</Text>
        <Text>{user.username}</Text>
        <Spacer />
        <Button onClick={signOut} color="gradient" auto ghost rounded>ログアウト</Button>
      </main>

      <Grid.Container gap={2}>
        {information.map((information, key) => (
          <Grid xs={12} md={4} key = {key}>
            <Card color={information.color}>
                <Text h3 css={{ fontWeight: '$bold', color: '$white' }}>
                  {information.faculty}
                </Text>
                {information.department.map((department, key) => (
                  <Text css={{ fontWeight: '$bold', color: '$white' }} span key = {key}>・{department}</Text>
                ))}
            </Card>
          </Grid>
        ))}
      </Grid.Container>

      <Footer />
    </div>
  )
}

export default withAuthenticator(Home)
