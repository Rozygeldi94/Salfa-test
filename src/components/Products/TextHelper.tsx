import { FC } from "react";
import { ISidebarFilter } from "@/store/products/dummyjson.com_slice";
import { IProduct } from "@/types/product.types";
import { Box, Text, useColorMode } from "@chakra-ui/react";

interface ITextHelperProps {
  list: IProduct[];
  searchInputValue: string;
  sidebarFilterValues: ISidebarFilter;
  currentItems: IProduct[];
}

export const TextHelper: FC<ITextHelperProps> = ({
  list,
  searchInputValue,
  sidebarFilterValues,
  currentItems,
}) => {
  const { colorMode } = useColorMode();
  let result2;

  if (searchInputValue) {
    if (
      searchInputValue &&
      list?.length &&
      (sidebarFilterValues?.brand?.length === 1 ||
        sidebarFilterValues?.category?.length === 1)
    ) {
      result2 = (
        <Text>
          {`${currentItems?.length} results are listed for the search "${searchInputValue}"`}
        </Text>
      );
    } else {
      if (list?.length) {
        result2 = <Text>{`Total ${list?.length} results`}</Text>;
      }
    }
  } else if (list?.length) {
    if (
      sidebarFilterValues?.category?.length === 1 &&
      sidebarFilterValues?.brand?.length === 1
    ) {
      result2 = (
        <Text>
          {`${list?.length} results for the category 
      "${sidebarFilterValues.category[0]}" and for the brand  "${sidebarFilterValues.brand[0]}"`}
        </Text>
      );
    } else if (
      sidebarFilterValues?.category?.length === 1 &&
      sidebarFilterValues?.category?.length === 1
    ) {
      result2 = (
        <Text>
          {`${list?.length} results are listed for the category 
          "${sidebarFilterValues?.category[0]}"`}
        </Text>
      );
    } else if (sidebarFilterValues?.brand?.length === 1) {
      result2 = (
        <Text>{`${list?.length} results are listed for the brand 
      "${sidebarFilterValues.brand[0]}"`}</Text>
      );
    } else {
      if (list?.length !== 0) {
        result2 = <Text>{`Total ${list?.length} results`}</Text>;
      }
    }
  }

  return (
    <Box
      fontSize="1.1rem"
      fontWeight="600"
      color={colorMode === "light" ? "blue" : "#b1dc26"}
    >
      {result2}
    </Box>
  );
};
