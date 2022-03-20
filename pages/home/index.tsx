import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { Text, Button, Spacer, Card, Grid, Link } from '@nextui-org/react'
import { withAuthenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import Header from '../../components/header'
import Footer from '../../components/footer'

const Home: NextPage<{ user: any, signOut: any }> = ({ user, signOut }: { user: any, signOut: any }) => {
  const router = useRouter()
  const information = [
    {
      faculty: "工学部",
      department: [
        { japanese: "電気電子・情報工学科", english: "electronic_and_computer_engineering" },
        { japanese: "機械工学科", english: "mechanical_engineering" },
        { japanese: "化学・生命工学科", english: "chemistry_and_biomolecular_science" }
      ],
      color: "primary",
    },
    {
      faculty: "応用生物科学部",
      department: [
        { japanese: "生産環境科学科", english: "agricultural_and_environmental_sciences" },
        { japanese: "応用生命科学科", english: "food_and_life_sciences" }
      ],
      color: "secondary",
    },
    {
      faculty: "地域科学部",
      department: [
        { japanese: "地域政策学科", english: "policy_studies" },
        { japanese: "地域文化学科", english: "cultural_studies" }
      ],
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
          <Grid xs={12} md={4} key={key}>
            <Card color={information.color}>
              <Text h3 css={{ fontWeight: '$bold', color: '$white' }}>
                {information.faculty}
              </Text>
              {information.department.map((department, key) => (
                <Link href={`/problems?${encodeURIComponent(department.english)}`} key={key} color="white" icon>
                  <a>
                    <Text css={{ fontWeight: '$bold', color: '$white' }} span>・{department.japanese}</Text>
                  </a>
                </Link>
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
