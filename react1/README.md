# react study 1

## setup

パッケージ管理はpnpmを利用する

```
# pnpmがマシン未インストールの場合
npm install -g pnpm

cd react1
pnpm install
pnpm dev
```

## リファレンス

* Typescript
  * https://qiita.com/EBIHARA_kenji/items/4de2a1ee6e2a541246f6
* React
  * https://typescriptbook.jp/tutorials/react-like-button-tutorial
* Next.js
  * https://qiita.com/studio_haneya/items/738dda2a8f08ad7d82b1
* Chakra UI
  * https://qiita.com/mackie0122/items/cb860fe222cafdf81763

## フォルダ、ファイル名

### フォルダ
* components
  * Reactコンポーネントの部品を配置
* pages
  * コンポーネントを組み合わせる
  * Next.jsにより、pagesフォルダ配下のファイル名で自動的にルーティングしてくれる

### ファイル
* components/layout
  * レイアウト
  * ヘッダー、フッター、ページ幅等々を指定
  * pagesのファイルにこれを適用することでページの共通部分を配置できる
* pages/_app.tsx
  * Next.js特有のファイル
  * 全ページ共通部分
  * 今回はChakra UIを利用するためにのみ使用
* pages/index.tsx
  * トップページ
* theme.ts
  * テーマファイル（Chakra UI 特有）
  * 色コードの共通部分や、フォント情報等々をここで定義できる

## チュートリアル

### 初回実行
まずは実行してみる
```
pnpm dev
```
React Tutorialという文言だけが表示される

### ヘッダー
ヘッダーを作る

components/header というフォルダを作成

components/header/header.tsx というファイルを作成し、以下を記入
```
import React from "react";
import NextLink from "next/link";
import {
  Flex,
  Box,
  IconButton,
  Spacer,
  Button,
  Heading,
  Container,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
import { ChevronLeftIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

export const Header: React.FC = () => {
  // 追加 カラーモードを切り替える
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    /* 変更　ライトモードでgray.100,ダークモードでgray.900とする。 */
    <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
      <Container maxW="container.lg">
        <Flex
          as="header"
          py="4"
          justifyContent="space-between"
          alignItems="center"
        >
          <NextLink href="/" passHref>
            {/* 変更 ライトモードでgray.600、ダークモードでwhiteとする */}
            <Heading
              as="h1"
              fontSize="2xl"
              cursor="pointer"
              color={useColorModeValue("gray.600", "white")}
            >
              Chord-Analysis
            </Heading>
          </NextLink>
          {/* 追加 切り替えアイコン */}
          <Button size="lg" onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};
```

これでヘッダー部品ができた

layoutに配置してみる

components/layout/layout.tsx
```
import React, { ReactElement } from "react";
import { Flex, Box, Container } from "@chakra-ui/react";
import { Header } from "../header/header";

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <>
    <Header />
    <Flex bg="gray.100" h="100vh">
      <Container maxW="container.lg">{children}</Container>
    </Flex>
  </>
);
```
`import { Header } from "../header/header";` で、先程の部品をimportする

`<Header />` と書くことで実際に配置

※ pagesに直接配置することもできる

### コンテンツ
コンテンツを作る

components/content というフォルダを作成

components/content/content.tsx というファイルを作成し、以下を記入

```
import Head from "next/head";
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
} from "@chakra-ui/react";

export function Content() {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            チュートリアル <br />
            <Text as={"span"} color={"green.400"}>
              1: React Component
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            React の Componentだけを配置するためのチュートリアルです <br />
            APIからデータを取得する等の処理は次回移行になります
          </Text>
          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <Button
              colorScheme={"green"}
              bg={"green.400"}
              rounded={"full"}
              px={6}
              _hover={{
                bg: "green.500",
              }}
            >
              Get Started
            </Button>
            <Button variant={"link"} colorScheme={"blue"} size={"sm"}>
              Learn more
            </Button>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
```

共通部分では無いため、pagesに直接配置する

pages/index.tsx
```
import { Box, Button, Heading } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Layout } from "../components/layout/layout";
import styles from "../styles/Home.module.css";
import { Content } from "../components/content/content";

const Home: NextPage = () => {
  return (
    <Layout>
      <Content />
    </Layout>
  );
};

export default Home;
```

### フッター

フッターを作る

components/footer というフォルダを作成

components/footer/footer.tsx というファイルを作成し、以下を記入

```
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { ReactNode } from "react";

const SocialButton = ({
  children,
  label,
  href,
}: {
  children: ReactNode;
  label: string;
  href: string;
}) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export const Footer: React.FC = () => {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Text>© 2022 CancaoNovaChor. All rights reserved</Text>
        <Stack direction={"row"} spacing={6}>
          <SocialButton label={"Twitter"} href={"#"}>
            <FaTwitter />
          </SocialButton>
          <SocialButton label={"YouTube"} href={"#"}>
            <FaYoutube />
          </SocialButton>
          <SocialButton label={"Instagram"} href={"#"}>
            <FaInstagram />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
};
```

共通部分なのでlayoutに配置する

components/layout/layout.tsx
```
import React, { ReactElement } from "react";
import { Flex, Box, Container } from "@chakra-ui/react";
import { Header } from "../header/header";
import { Footer } from "../footer/footer";

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <>
    <Header />
    <Flex bg="gray.100" h="100vh">
      <Container maxW="container.lg">{children}</Container>
    </Flex>
    <Footer />
  </>
);
```

### theme

テーマ編集を試してみる

footer.tsxに `bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}` というような記述がある

blackAlpha.100 というのはtheme.tsに記載されている定義

theme.ts の `100: '#e9ebed',` ここの色コードを変更すると反映される

※ useColorModeValueは、Chakra UI の関数で、ダークモードの切り替え時のものを記載できる。 `whiteAlpha` というのはダークモードの色


### その他

react1-full ブランチに全部記述したものがある

git checkout -b react1-full

git pull origin react1-full