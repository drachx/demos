import Head from "next/head";
import styles from "../styles/Home.module.css";

import { ApolloClient, InMemoryCache, useQuery, gql } from "@apollo/client";

/*
playground: https://www.graphqlbin.com/v2/new
api: https://graphbrainz.herokuapp.com/
others: https://apis.guru/graphql-apis/

$ npx create-next-app bands
$ cd bands
$ npm i @apollo/client graphql
$ npm run dev
*/

export async function getStaticProps() {
    const client = new ApolloClient({
        uri: "https://spotify-graphql-server.herokuapp.com/graphql",
        cache: new InMemoryCache(),
    });

    const { data } = await client.query({
        query: gql`
        {
            queryArtists(byName: "Radiohead") {
              name
              id
              image
              albums {
                name
                id
                image 
              }
            }
          }
          
        `,
    });

    return {
        props: {
            data: data.queryArtists
        },
    };
}

/*
data {
    name
    image
    albums: [
        {
            name
            image
        }
    ]
}
*/

const centered = { "text-align": "center" }
const imageStyleBand = { width: "350px", height: "350px", "border-radius": "50%", margin: "25px" };
const imageStyleAlbum = { width: "250px", height: "250px", "border-radius": "50%" };

function Band({ data }) {
    return (
        <div style={centered}>
            <h1 className={styles.title}>{data.name} - albums({data.albums.length})</h1>
            <img src={data.image} style={imageStyleBand}></img>
        </div>
    );
}

function Albums({ data }) {
    return (
        <div className={styles.grid}>
            {data.map((album) => (
                <div className={styles.card} style={centered}>
                    <h4>{album.name}</h4>
                    <img src={album.image} style={imageStyleAlbum}></img>
                </div>
            ))}
        </div>
    )
}

export default function Home({ data }) {
    return (
        <div className={styles.container}>
            <Head>
                <title>Music Graphql</title>
                <meta name="description" content="Bands" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                {data.map((band) => (
                    <div>
                        <Band data={band}></Band>
                        <Albums data={band.albums}></Albums>
                    </div>
                ))}
            </main>

            <footer className={styles.footer}>
                /;.
            </footer>
        </div>
    );
}

/* Extra CSS - just fancy thingy
img {
  transition: transform .1s;
}

img:hover {
  transform: scale(1.1);
  transform: rotate(360deg);
  transition: all 1s ease-in-out 0s;
}
*/
