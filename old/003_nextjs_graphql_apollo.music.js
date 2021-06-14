import Head from "next/head";
import styles from "../styles/Home.module.css";

import { ApolloClient, InMemoryCache, useQuery, gql } from "@apollo/client";

/*
playground: https://www.graphqlbin.com/v2/new
api: https://graphbrainz.herokuapp.com/
others: https://apis.guru/graphql-apis/

$ npx create-next-app music
$ cd music
$ npm i @apollo/client graphql
$ npm run dev
*/

export async function getStaticProps() {
    const client = new ApolloClient({
        uri: "https://graphbrainz.herokuapp.com/",
        cache: new InMemoryCache(),
    });

    const { data } = await client.query({
        query: gql`
        {
            search {
              releaseGroups(query: "Christmas") {
                results: edges {
                  releaseGroup: node {
                    title
                    fanArt {
                      albumCovers {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        `,
    });

    return {
        props: {
            data: data.search.releaseGroups.results
        },
    };
}

/*
title: data.releaseGroup.title
fanArt: data.releaseGroup.fanArt
image: data.releaseGroup.fanArt.albumCovers[0].url
*/

export default function Home({ data }) {
    const imageStyle = {
        width: "250px",
        height: "250px"
    };
    const media = data.filter(data => !!data.releaseGroup.fanArt && !!data.releaseGroup.fanArt.albumCovers && data.releaseGroup.fanArt.albumCovers.length > 0);
    return (
        <div className={styles.container}>
            <Head>
                <title>Music Graphql</title>
                <meta name="description" content="Music Graphql" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>Christmas ({media.length})</h1>

                <div className={styles.grid}>
                    {media.map((data) => (
                        <div className={styles.card}>
                            <h2>{data.releaseGroup.title}</h2>
                            <img src={data.releaseGroup.fanArt.albumCovers[0].url} style={imageStyle}></img>
                        </div>
                    ))}
                </div>
            </main>

            <footer className={styles.footer}>
                /;.
            </footer>
        </div>
    );
}
