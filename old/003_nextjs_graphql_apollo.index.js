import Head from "next/head";
import styles from "../styles/Home.module.css";

import { ApolloClient, InMemoryCache, useQuery, gql } from "@apollo/client";

/*
playground: https://www.graphqlbin.com/v2/new
api: https://graphql-weather-api.herokuapp.com/
others: https://apis.guru/graphql-apis/

$ npx create-next-app weather
$ cd weather
$ npm i @apollo/client graphql
$ npm run dev
*/

export async function getStaticProps() {
    const client = new ApolloClient({
        uri: "https://graphql-weather-api.herokuapp.com/",
        cache: new InMemoryCache(),
    });

    const { data } = await client.query({
        query: gql`
            {
                getCityByName(name: "Auckland") {
                    id
                    name
                    country
                    weather {
                        summary {
                            title
                            description
                            icon
                        }
                    }
                }
            }
        `,
    });

    return {
        props: {
            weather: {
                city: data.getCityByName.name,
                country: data.getCityByName.country,
                summary: data.getCityByName.weather.summary
            }
        },
    };
}

export default function Home({ weather }) {
    const weatherIcon = `http://openweathermap.org/img/w/${weather.summary.icon}.png`;

    return (
        <div className={styles.container}>
            <Head>
                <title>Weather App</title>
                <meta name="description" content="Weather application" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>Weather in {weather.city}({weather.country})</h1>

                <div className={styles.grid}>
                    <div className={styles.card}>
                        <h5>({weather.country}) {weather.city}</h5>
                        <div>
                            <img src={weatherIcon}></img>
                            <span>{weather.summary.title} ({weather.summary.description})</span>
                        </div>
                    </div>
                </div>
            </main>

            <footer className={styles.footer}>
                /;.
            </footer>
        </div>
    );
}
