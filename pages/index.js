import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import React from "react";
import { Query } from "react-apollo";
import Link from "next/link";
import Head from "next/head";

import withData from "../lib/apollo";

import Nav from "../components/nav";

const GET_POSTS = gql`
  query($skip: Int, $first: Int) {
    allPosts(skip: $skip, first: $first) {
      id
      title
      url
    }
  }
`;
const POSTS_PER_PAGE = 18;

const AllPosts = () => {
  const { loading, error, data, fetchMore } = useQuery(GET_POSTS, {
    variables: { skip: 0, first: POSTS_PER_PAGE },
    notifyOnNetworkStatusChange: true
  });

  if (loading) return "Loading...";
  if (error) return `Error: ${error}`;

  const { allPosts } = data;
  return (
    <>
      {allPosts.map(({ id, title, url }) => (
        <Link key={id} href={url}>
          <a className="card">
            <h3>{title}</h3>
          </a>
        </Link>
      ))}
      <style jsx>{`
        .card {
          padding: 18px 18px 24px;
          width: 220px;
          text-align: left;
          text-decoration: none;
          color: #434343;
          border: 1px solid #9b9b9b;
        }
        .card:hover {
          border-color: #067df7;
        }
        .card h3 {
          margin: 0;
          color: #067df7;
          font-size: 18px;
        }
        .card p {
          margin: 0;
          padding: 12px 0 0;
          font-size: 13px;
          color: #333;
        }
      `}</style>
    </>
  );
};

const Home = () => (
  <div>
    <Head>
      <title>Home</title>
    </Head>

    <Nav />

    <div className="hero">
      <h1 className="title">Welcome to Next.js!</h1>
      <p className="description">
        To get started, edit <code>pages/index.js</code> and save to reload.
      </p>

      <div className="row">
        <AllPosts />
      </div>
    </div>

    <style jsx>{`
      .hero {
        width: 100%;
        color: #333;
      }
      .title {
        margin: 0;
        width: 100%;
        padding-top: 80px;
        line-height: 1.15;
        font-size: 48px;
      }
      .title,
      .description {
        text-align: center;
      }
      .row {
        max-width: 880px;
        margin: 80px auto 40px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
      }
      .card {
        padding: 18px 18px 24px;
        width: 220px;
        text-align: left;
        text-decoration: none;
        color: #434343;
        border: 1px solid #9b9b9b;
      }
      .card:hover {
        border-color: #067df7;
      }
      .card h3 {
        margin: 0;
        color: #067df7;
        font-size: 18px;
      }
      .card p {
        margin: 0;
        padding: 12px 0 0;
        font-size: 13px;
        color: #333;
      }
    `}</style>
  </div>
);

export default withData(Home);
