import { Box, Button, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Layout } from "../components/layout/layout";
import styles from "../styles/Home.module.css";
import { Content } from "../components/content/content";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";

const Home: NextPage = () => {
  return (
    <Layout>
      <Content />
      <Checkbox defaultChecked>Checkbox</Checkbox>
    </Layout>
  );
};

export default Home;
