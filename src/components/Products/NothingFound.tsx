import { Box, Image, Text } from "@chakra-ui/react";
import { useEffect } from "react";

export const NothingFound = () => {
  useEffect(() => {
    const productsWrap = document.querySelector(
      ".productsWrap"
    ) as HTMLDivElement;
    if (productsWrap) {
      productsWrap.style.display = "block";
    }
    return () => {
      if (productsWrap) {
        productsWrap.style.display = "grid";
      }
    };
  }, []);
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap="10px"
    >
      <Image src="/nothing_found.webp" alt="nothong found gif animation" />
      <Text fontSize={{ base: "0.9rem", md: "1.1rem" }} fontWeight="600">
        Sorry! There is nothing found!
      </Text>
    </Box>
  );
};
