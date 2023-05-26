import React from "react";
import { Box, Spinner, VStack } from "@chakra-ui/react";

const Loader = () => {
  return (
    <VStack h="80vh" justifyContent={"center"}>
      <Box transform={"scale(30)"}>
        <Spinner size="xl" emptyColor="white" />
      </Box>
    </VStack>
  );
};

export default Loader;
