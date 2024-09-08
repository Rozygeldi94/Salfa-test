import { FC, useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Text, Link, Image, Box, List, ListItem, Flex } from "@chakra-ui/react";
import { makeStringBold } from "@/utils/makeStringBold";
import { useActions } from "@/hooks/useActions";
import { IProductCards } from "@/types/product.types";
import { MainContext } from "@/pages/Layout";

interface ISearchedCategoryModalProps {
  type: string;
  list: string[];
  searchInputValue: string;
}

export const SearchedCategoryModal: FC<ISearchedCategoryModalProps> = ({
  type,
  list,
  searchInputValue,
}) => {
  const { resetInputValue } = useActions();
  const handleResetInputValue = () => {
    resetInputValue();
  };
  return (
    <List flexGrow="1" display="flex" flexDirection="column">
      {list?.map((item) => (
        <ListItem
          width="100%"
          padding="3px 6px"
          _hover={{ background: "#a4a2cf" }}
        >
          <Link
            as={RouterLink}
            to={`/products/${type}/${String(item).toLowerCase()}`}
            _hover={{ textDecoration: "none" }}
            dangerouslySetInnerHTML={{
              __html: makeStringBold(item, searchInputValue),
            }}
            onClick={handleResetInputValue}
          ></Link>
        </ListItem>
      ))}
    </List>
  );
};

export const SearchedProductsModal: FC<IProductCards> = ({ products }) => {
  return (
    <List flexGrow="1" display="flex" flexDirection="column" gap="10px">
      {products?.map((product) => (
        <ListItem display="flex">
          <Link
            as={RouterLink}
            to={`/products/${product?.category}/${product?.id}/${product?.title}`}
            width="100%"
            _hover={{ textDecoration: "none" }}
          >
            <Flex
              minH="40px"
              padding="5px 10px"
              alignItems="center"
              gap="15px"
              background="#a7a4de"
              _hover={{ background: "#918eca" }}
            >
              <Image
                maxWidth="50px"
                width="100%"
                maxH="50px"
                src={product?.thumbnail}
                alt="search product image"
              />
              <Flex flexDirection="column" width="100%">
                <Text as="span" fontSize="0.9rem" fontWeight="500">
                  {product?.title}
                </Text>
                <Text as="span" color="#123292" fontSize="0.9rem">
                  {product?.price} TL
                </Text>
              </Flex>
            </Flex>
          </Link>
        </ListItem>
      ))}
    </List>
  );
};
