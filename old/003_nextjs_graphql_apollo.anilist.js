import Head from "next/head";
import styles from "../styles/Home.module.css";

import { ApolloClient, InMemoryCache, useQuery, gql } from "@apollo/client";

/*
playground: https://www.graphqlbin.com/v2/new
api: https://graphql-weather-api.herokuapp.com/
others: https://apis.guru/graphql-apis/

$ npx create-next-app anilist
$ cd anilist
$ npm i @apollo/client graphql
$ npm run dev
*/

export async function getStaticProps() {
    const client = new ApolloClient({
        uri: "https://graphql.anilist.co",
        cache: new InMemoryCache(),
    });

    const { data } = await client.query({
        query: gql`
        {
            Page {
                media {
                    title {
                        english
                    }
                    description
                    coverImage {
                        large
                        medium
                        color
                    }
                }
            }
        }
        `,
    });

    return {
        props: {
            data: data.Page.media
        },
    };
}

/*
title: data.title.english
description: data.description
image: data.coverImage.large
color: data.coverImage.color
*/

export default function Home({ data }) {
    return (
        <div className={styles.container}>
            <Head>
                <title>Anilist Graphql</title>
                <meta name="description" content="Anilist Graphql" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>Anilist ({data.length})</h1>

                <div className={styles.grid}>
                    {data.map((data) => (
                        <div className={styles.card}>
                            <h2>{data.title.english}</h2>
                            <img src={data.coverImage.large}></img>
                            <p dangerouslySetInnerHTML={{ __html: data.description }}></p>
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
