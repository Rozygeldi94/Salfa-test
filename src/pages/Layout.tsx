import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

import {
  Dispatch,
  SetStateAction,
  Suspense,
  createContext,
  useState,
} from "react";
import { Box, Flex } from "@chakra-ui/react";
import LoadingSpinner from "@/components/LoadingSpinner";

type TMainContext = {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const MainContext = createContext<TMainContext>({
  isModalOpen: false,
  setIsModalOpen: () => {},
});

export default function Layout() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Flex flexDirection="column" minHeight="100vh">
      <MainContext.Provider
        value={{
          isModalOpen,
          setIsModalOpen,
        }}
      >
        <Header />
        <Box
          as="main"
          pt="55px"
          flexGrow="1"
          position="relative"
          bgColor="#ebeff2"
        >
          <Suspense fallback={<LoadingSpinner />}>
            <Outlet />
          </Suspense>
        </Box>
      </MainContext.Provider>
    </Flex>
  );
}
