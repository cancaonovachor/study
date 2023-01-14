import React, { ReactElement } from "react";
import { Flex, Box, Container } from "@chakra-ui/react";

export const Layout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <>
    <Flex bg="gray.100" h="100vh">
      <Container maxW="container.lg">{children}</Container>
    </Flex>
  </>
);
