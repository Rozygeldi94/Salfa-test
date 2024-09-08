import { FC } from "react";
import { Text, Image, Box, Link, Flex, Button } from "@chakra-ui/react";
import { StarRating } from "./StarRating";
import { Link as RouterLink } from "react-router-dom";
import { MdComment } from "react-icons/md";
import { IProduct } from "@/types/product.types";
import { useActions } from "@/hooks/useActions";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface IProductCardProps {
  product: IProduct;
  hasDiscount?: boolean;
  isRecommended?: boolean;
}

export const ProductCard: FC<IProductCardProps> = ({
  product,
  hasDiscount,
  isRecommended,
}) => {
  const { productLike, removeProduct } = useActions();

  const newPrice = Math.floor(
    (product?.price / 100) *
      (100 -
        Math.floor(
          product?.discountPercentage ? product?.discountPercentage : 0
        ))
  );

  return (
    <Link
      as={RouterLink}
      to={`/products/${product?.category}/${product?.id}/${product?.title}`}
      maxWidth="260px"
      padding="35px 10px 10px 10px"
      position="relative"
      bg="#fff"
      border="2px solid #201e1d1f"
      boxShadow={"rgba(99, 99, 99, 0.2)0px 2px 8px 0px"}
      _hover={{
        boxShadow: "rgba(50, 119, 210, 0.9)0px 2px 10px 0px",
        textDecoration: "none",
      }}
    >
      <Flex
        justifyContent="space-between"
        position="absolute"
        top="10px"
        left="10px"
        width="88%"
      >
        <Text
          as="span"
          padding="3px 5px"
          bg="gray.500"
          borderRadius="1px"
          color="#fff"
          fontSize="0.7rem"
          zIndex="3"
          _hover={{ textDecoration: "none" }}
        >
          {product?.category}
        </Text>
        <Box
          onClick={(e) => {
            e.preventDefault();
            productLike(product?.id);
          }}
        >
          {product?.isLiked === true ? (
            <FaHeart color="#d02c2c" size="20px" />
          ) : (
            <FaRegHeart color="#484036" size="20px" />
          )}
        </Box>
      </Flex>

      <Box mb="10px" height="200px" position="relative">
        <Image
          src={product?.images?.[0] as string}
          alt={product?.title}
          maxH="200px"
          h="max-content"
          w="max-content"
          position="absolute"
          top="50%"
          left="50%"
          transform={"translate(-50%, -50%)"}
        />
      </Box>

      <Text
        mb="5px"
        overflow="hidden"
        height="43.2px"
        fontSize="0.9rem"
        fontWeight="500"
        sx={{
          display: "-webkit-box",
          WebkitLineClamp: "2",
          WebkitBoxOrient: "vertical",
        }}
      >
        {product?.title}
      </Text>

      {!hasDiscount && (
        <Flex justifyContent="space-between">
          {isRecommended ? (
            <Image maxW="35px" src="recommended.png" alt="recommended logo" />
          ) : (
            <StarRating productRating={product?.rating} />
          )}
          <Flex alignItems="center" gap="3px">
            <MdComment />
            {product?.reviews?.length}
          </Flex>
        </Flex>
      )}
      <Box
        mt="10px"
        display="flex"
        justifyContent="end"
        alignItems="center"
        gap="10px"
      >
        {hasDiscount && (
          <Text fontSize="1.2rem" color="green" fontWeight="600">
            {newPrice} TL
          </Text>
        )}
        {hasDiscount ? (
          <Box position="relative">
            <del style={{ fontSize: "0.9rem", color: "#a0b4cf" }}>
              {product?.price} TL
            </del>
            <Text
              as="span"
              padding="1px 5px"
              fontSize="0.8rem"
              position="absolute"
              top="-20px"
              left="0"
              color="#fff"
              bg="#b92114"
              borderRadius="8px"
            >
              -
              {Math.floor(
                product?.discountPercentage ? product?.discountPercentage : 0
              )}
              %
            </Text>
          </Box>
        ) : (
          <Text fontSize="1.2rem" color="green" fontWeight="600">
            {" "}
            {product?.price} TL
          </Text>
        )}
        {!hasDiscount && (
          <Text
            padding="3px 5px"
            bg="blue.500"
            borderRadius="1px"
            color="#fff"
            fontSize="0.7rem"
            zIndex="3"
            _hover={{ textDecoration: "none" }}
          >
            Stock: {product?.stock || 1}
          </Text>
        )}
      </Box>
      <Flex justifyContent="center">
        <Button
          mt="10px"
          width="100%"
          colorScheme="blue"
          size="xs"
          onClick={(e) => {
            e.preventDefault();
            removeProduct(product?.id);
          }}
        >
          Remove
        </Button>
      </Flex>
    </Link>
  );
};
