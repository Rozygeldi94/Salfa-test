import { useContext, useEffect } from "react";
import { useLocation, useParams, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Text,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Link,
} from "@chakra-ui/react";
import { FaAngleRight } from "react-icons/fa";
import { StarRating } from "../ProductCard/StarRating";
import { ROOT } from "@/route";
import { useGetProductByIdQuery } from "@/store/api";
import { ProductImages } from "./ProductImages";
import { MainContext } from "@/pages/Layout";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { IProduct } from "@/types/product.types";
import { useTypedSelector } from "@/hooks/useTypedSelector";

export const Product = () => {
  const { id } = useParams();
  const { data } = useGetProductByIdQuery(id as string);
  const { products } = useTypedSelector((state) => state.products);
  let currentProduct = data;
  if (!currentProduct) {
    currentProduct = products?.filter((el) => el.id === +id)[0];
  }

  useDocumentTitle(currentProduct ? `${currentProduct?.title}` : "Product");
  const location = useLocation();
  const { isModalOpen, setIsModalOpen } = useContext(MainContext);

  useEffect(() => {
    isModalOpen && setIsModalOpen(false);
  }, [location.pathname]);

  return (
    <Box maxWidth="1230px" margin="20px auto">
      <Breadcrumb spacing="5px" padding="0 15px" separator={<FaAngleRight />}>
        <BreadcrumbItem>
          <BreadcrumbLink as={RouterLink} to={ROOT}>
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink as={RouterLink} to="#">
            {currentProduct?.category}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink
            as={RouterLink}
            color="#2f33e7"
            fontWeight="500"
            href="#"
          >
            {currentProduct?.brand}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Flex
        flexDirection={{ base: "column", isLargerThan600: "row" }}
        gap="40px"
        mt="15px"
        padding="0 15px"
      >
        <ProductImages currentProduct={currentProduct as IProduct} />
        <Box flexGrow="1">
          <Box
            w={{ isLargerThan360: "100%", md: "80%" }}
            h="100%"
            display="flex"
            flexDirection="column"
            gap={{ base: "10px", isLargerThan600: "0" }}
          >
            <Text mb="10px" fontSize="1.1rem">
              <Link as={RouterLink} to="#" fontWeight="600">
                {currentProduct?.brand ? `${currentProduct?.brand},` : ""}
              </Link>
              {currentProduct?.title}
            </Text>
            <Text flexGrow="1">{currentProduct?.description}</Text>
            <Text fontSize="1.2rem" color="green" fontWeight="600">
              {currentProduct?.price} TL
            </Text>
            <Flex gap="15px" alignItems="center">
              <Flex
                gap="10px"
                justifyContent="space-between"
                alignItems="center"
                margin="5px 0 10px 0"
              >
                {currentProduct?.rating}
                <StarRating productRating={currentProduct?.rating as number} />
              </Flex>
              <Text>{currentProduct?.reviews?.length} comments</Text>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};
