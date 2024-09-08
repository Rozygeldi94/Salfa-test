import { extendTheme } from "@chakra-ui/react";

const themes = {
  initialColorMode: "light",
  useSystemColorMode: true,
};

const breakpoints = {
  base: "0px",
  sm: "320px",
  isLargerThan360: "360px",
  isLargerThan440: "439px",
  isLargerThan450: "450px",
  isLargerThan500: "500px",
  isLargerThan550: "550px",
  isLargerThan600: "600px",
  isLargerThan650: "650px",
  isLargerThan700: "701px",
  md: "768px",
  isLargerThan850: "850px",
  lg: "960px",
  xl: "1200px",
  "2xl": "1536px",
};

const theme = extendTheme(themes, { breakpoints });
export default theme;
