import { RouterProvider } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { route } from "./route";
import { Provider } from "react-redux";
import { store } from "./store";
import "./App.css";
import theme from "./chakraUI/theme";

export function App() {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <RouterProvider router={route} />
      </ChakraProvider>
    </Provider>
  );
}
