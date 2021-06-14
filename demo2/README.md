60 seconds

1. GraphQL app client - quick sample app - https://graphql.org/
2. Playground - https://www.graphqlbin.com/v2/new
3. GraphQL server - https://graphbrainz.herokuapp.com/
4. Query

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

5. npx create-next-app music
6. cd music
7. install prereq - $ npm i @apollo/client graphql
8. npm run dev
9. create pages/music.js
10. Add imports

    import Head from "next/head";
    import styles from "../styles/Home.module.css";
    import { ApolloClient, InMemoryCache, useQuery, gql } from "@apollo/client";
    
11. getStaticProps - fetch data when loading

// Fetch server side data
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

12. Create component

// create component
export default function Home({ data }) {
    const imageStyle = { width: "250px", height: "250px" };
    const media = data.filter(
        data => !!data.releaseGroup.fanArt
            && !!data.releaseGroup.fanArt.albumCovers
            && data.releaseGroup.fanArt.albumCovers.length > 0
    );
    return (
        <div className={styles.container}>
            <Head>
                <title>Music Graphql</title>
                <meta name="description" content="Music Graphql" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>Music ({media.length})</h1>
                <div className={styles.grid}>
                    {media.map((data) => (
                        <div className={styles.card}>
                            <h2>{data.releaseGroup.title}</h2>
                            <img src={data.releaseGroup.fanArt.albumCovers[0].url} style={imageStyle}></img>
                        </div>
                    ))}
                </div>
            </main>
            <footer className={styles.footer}>/;.</footer>
        </div>
    );
}

/*

1. GraphQL app client - https://graphql.org/
2. Playground - https://www.graphqlbin.com/v2/new
3. GraphQL server - https://graphbrainz.herokuapp.com/
4. More GraphQL API - https://github.com/APIs-guru/graphql-apis
5. NextJS + Apollo + GraphQL
 
*/