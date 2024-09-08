import { FC, useContext, useEffect } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Box, useMediaQuery, Flex, Button } from "@chakra-ui/react";
import { CREATE_PRODUCT, ROOT } from "@/route";
import { Search } from "./Middle-Section/Search-Products";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { MainContext } from "@/pages/Layout";
import { SearchModalContainer } from "./Middle-Section/Search-Products/SearchModalContainer";
import { RiArrowGoBackFill } from "react-icons/ri";

export const Header: FC = () => {
  const location = useLocation();
  const isCreateProductPage = location.pathname.includes("create-product");

  const { isModalOpen, setIsModalOpen } = useContext(MainContext);
  const [isLargerThan767] = useMediaQuery("(min-width: 768px)");

  const [isLargerThan600] = useMediaQuery("(min-width: 600px)");

  const searchInputValue = useTypedSelector(
    (state) => state.searchProducts.value
  );

  useEffect(() => {
    if (searchInputValue.length) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [searchInputValue]);

  return (
    <Box
      as="header"
      id="header"
      minH="62px"
      bg="#fff"
      boxShadow="0px 0 0 3px rgba(0,0,0,0.05)"
      width="100%"
      position="fixed"
      top="0"
      left="0"
      zIndex="999"
    >
      <Flex
        maxWidth="1230px"
        width="100%"
        padding={{ base: "0 10px", isLargerThan440: "0 15px" }}
        margin={isLargerThan767 ? "15px auto" : "4px 0"}
        alignItems="center"
        gap={{ base: "10px", isLargerThan440: "20px", md: "40px" }}
        position="relative"
      >
        <Box margin="0 auto" height="100%" minW={500} maxW="100%">
          <Search isMobile={isLargerThan600 ? false : true} isVisible={false} />
        </Box>
        <Button
          colorScheme="blue"
          as={RouterLink}
          to={isCreateProductPage ? ROOT : CREATE_PRODUCT}
        >
          {isCreateProductPage ? (
            <Flex gap="5px" alignItems="center">
              <RiArrowGoBackFill /> Back
            </Flex>
          ) : (
            <span>Create a product</span>
          )}
        </Button>
        {isModalOpen && <SearchModalContainer />}
      </Flex>
    </Box>
  );
};
