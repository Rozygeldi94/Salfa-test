import { FC } from "react";
import { Box, Tooltip } from "@chakra-ui/react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

interface IStarRatingProps {
  productRating: number;
}

export const StarRating: FC<IStarRatingProps> = ({ productRating }) => {
  const starRating = Array.from({ length: 5 }, (el, index) => {
    const colorStar = "red";
    const numHalf = index + 0.5;

    return (
      <span key={index}>
        {productRating >= index + 1 ? (
          <FaStar color={colorStar} />
        ) : productRating > numHalf ? (
          <FaStarHalfAlt color={colorStar} />
        ) : (
          <FaRegStar color={colorStar} />
        )}
      </span>
    );
  });

  return (
    <Tooltip label={productRating}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex">{starRating}</Box>
      </Box>
    </Tooltip>
  );
};
