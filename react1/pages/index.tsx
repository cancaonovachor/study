import { Box, Button, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Layout } from "../components/common/layouts/layouts";
import styles from "../styles/Home.module.css";
import { Content } from "../components/common/content/content";

const Home: NextPage = () => {
  return (
    <Layout>
      <Content />
    </Layout>
  );
};

export default Home;
