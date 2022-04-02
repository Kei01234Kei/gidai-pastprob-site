import type { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import { Text, Button, Spacer, Card, Grid, Link } from '@nextui-org/react'
import { API, Auth } from 'aws-amplify'
import { withAuthenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import Header from '../../components/header'
import Footer from '../../components/footer'

const Home = ({ user, signOut }: any) => {
  const information = [
    {
      faculty: {
        japanese: {
          name: "工学部"
        },
        english: {
          name: "engineering"
        }
      },
      department: [
        {
          japanese: {
            name: "電気電子・情報工学科",
            course: ["情報コース", "電気電子コース", "応用物理コース"]
          },
          english: {
            name: "electronic_and_computer_engineering",
            course: ["information_course", "electrical_electronic_course", "applied_physics_course"]
          },
        },
        {
          japanese: {
            name: "機械工学科",
            course: ["機械コース", "知能機械コース"]
          },
          english: {
            name: "mechanical_engineering",
            course: ["mechanical_engineering_course", "intelligence_mechanical_engineering_course"]
          }
        },
        {
          japanese: {
            name: "化学・生命工学科",
            course: ["物質化学コース", "生命化学コース"]
          },
          english: {
            name: "chemistry_and_biomolecular_science",
            course: ["materials_chemistry_course", "biomolecular_science_course"]
          }
        }
      ],
    },
    {
      faculty: {
        japanese: {
          name: "応用生物科学部"
        },
        english: {
          name: "applied_biological_sciences"
        }
      },
      department: [
        {
          japanese: {
            name: "生産環境科学科",
            course: ["応用植物科学コース", "応用動物科学コース", "環境生態科学コース"]
          },
          english: {
            name: "agricultural_and_environmental_sciences",
            course: ["plant_production", "animal_science_and_environmental_science", "ecology"]
          }
        },
        {
          japanese: {
            name: "応用生命科学科",
            course: ["分子生命科学コース", "食品生命科学コース"]
          },
          english: {
            name: "food_and_life_sciences",
            course: ["molecular_life_science", "food_science"]
          },
        }
      ],
    },
    {
      faculty: {
        japanese: {
          name: "地域科学部"
        },
        english: {
          name: "regional_studies"
        },
      },
      department: [
        {
          japanese: {
            name: "地域政策学科",
            course: []
          },
          english: {
            name: "policy_studies",
            course: []
          }
        },
        {
          japanese: {
            name: "地域文化学科",
            course: []
          },
          english: {
            name: "cultural_studies",
            course: []
          }
        }
      ],
    }
  ]
  const router = useRouter()
  const token = user.signInUserSession.idToken.jwtToken;
  console.log(token)
  const myInit = {
    headers: {
      Authorization: token,
    },
    queryStringParameters: {
      faculty: router.query.faculty,
      department: router.query.department,
      course: router.query.course,
    },
  };
  // API.get('dev', '/getsubjectdata', myInit)
  //   .then((res) => {
  //     console.log(res)
  //   })
  //   .catch((error) => {
  //     console.log("エラー出力")
  //     console.log(error)
  //   })

  API.get('dev', '/getdata', myInit)
    .then((res) => {
      console.log("getdataのやつ")
      console.log(res)
    })
    .catch((error) => {
      console.log("getdataのエラー出力")
      console.log(error)
    })

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
        <Text>ログインメールアドレス: {user.attributes.email}</Text>
        <Text>ユーザID: {user.username}</Text>
        {console.log(user)}
        <Spacer />
        <Button onClick={signOut} color="gradient" auto ghost rounded>ログアウト</Button>
      </main>

      <Grid.Container gap={2}>
        {information.map((information, key) => (
          <Grid xs={12} md={4} key={key}>
            <Card color="gradient">
              <Text h3 css={{ fontWeight: '$bold', color: '$white' }}>
                {information.faculty.japanese.name}
              </Text>
              {information.department.map((department, key) => (
                <Link href={`/list?faculty=${encodeURIComponent(information.faculty.english.name)}&department=${encodeURIComponent(department.english.name)}`} key={key} css={{ color: '$white' }} icon>
                  <a>
                    <Text css={{ fontWeight: '$bold', color: '$white' }} span>・{department.japanese.name}</Text>
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


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { faculty, department, course } = ctx.query
  const url = `https://liwk0erekc.execute-api.ap-northeast-1.amazonaws.com/prod/getsubjectdata?faculty=${faculty}&department=${department}&course=${course}`
  Auth.currentSession()
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      console.log(error)
    });
  // const user = await Auth.currentAuthenticatedUser()
  // console.log(user)
  // const res = await axios.get(url, {
  //   headers: {
  //     "Authorization": user.signInUserSession.idToken.jwtToken
  //   }
  // })
  // console.log(JSON.stringify(res.data))
  // const res = await axios.get(url, {
  //   headers: {
  //     Authorization: "eyJraWQiOiJwbXBEcjhaY2UrQmZydU42ek1BXC9NZkpzallFYlF4WlZhMXlUbDQxZDFRWT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJlZGY1MmU5My00NjcwLTRiNDEtYjA5ZS03NmNkNjYzNjVlZTkiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLW5vcnRoZWFzdC0xLmFtYXpvbmF3cy5jb21cL2FwLW5vcnRoZWFzdC0xX2w5VkY5WXpDdSIsImNvZ25pdG86dXNlcm5hbWUiOiJlZGY1MmU5My00NjcwLTRiNDEtYjA5ZS03NmNkNjYzNjVlZTkiLCJvcmlnaW5fanRpIjoiMmQ4YjYxZjItZmNkZi00ZTc4LThlYzktMTQ1ZGEyYWNlMjg2IiwiYXVkIjoiZXY2c2tkdGQwZ2w5MmFqdHE5dThnM2VwYSIsImV2ZW50X2lkIjoiYTRjMTEzMzMtNzgzOC00OTAxLWFmNjgtZjJhNWUxNzMyMmRkIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2NDg3MTEzMzksImV4cCI6MTY0ODcxNDkzOSwiaWF0IjoxNjQ4NzExMzM5LCJqdGkiOiJkNTk5NWMxZS03M2VjLTQ1MTctYmZlOS03NDZhZjEyMGQzYzIiLCJlbWFpbCI6ImtlaXN1a2UuMTMwQGljbG91ZC5jb20ifQ.jFvb6e3yU_0zogGlSvh5iIUZKLDQY0tLV-J_BvIFTN5ozAVn8mRGeR529oDl2dkw4E7ootszTe3mTrP35cLqlTTqbkniGjQZzwwxDwcv0ZFXEHfoT77rRzHV7Gi-EDrCN8cNIiNkRhC8Lk8k_D2Gn9D1iAL6AgbZ1DhlXKmovQOnBMyz2-b6v6qnRcR4_Bjis-sXFeX2FLehcSC6qA92kGmkTgE6qhVMK3LZs988D1vv9ed66_X0taBm2VR1YbKRFrUEveR8bTqF_4AOLgRGMMcLbD-yONBvJoTRC6G-PvRkPegeZQNYe0Awq8TBH8GbA66k3fjD4UpWgxp-Riwsug"
  //   }
  // })
  // const res = await fetch(`https://liwk0erekc.execute-api.ap-northeast-1.amazonaws.com/prod/getsubjectdata?faculty=${faculty}&department=${department}&course=${course}`)
  // const subjectData = await res.json
  // console.log("取得結果", subjectData)
  // return { props: { subjectData } }
  return { props: { "name": "keisuke" } }
}
