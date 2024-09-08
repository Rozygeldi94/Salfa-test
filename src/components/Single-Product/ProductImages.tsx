import { FC } from "react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Box, Image, useMediaQuery } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { IProduct } from "@/types/product.types";

interface IProductImagesProps {
  currentProduct: IProduct;
}

export const ProductImages: FC<IProductImagesProps> = ({ currentProduct }) => {
  const [isSmallerThan600] = useMediaQuery(["(max-width: 599px)"]);

  return (
    <Box
      minWidth="280px"
      maxWidth="700px"
      w="100%"
      height="max-content"
      position="relative"
    >
      <Swiper
        className="single-product-image"
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {currentProduct?.images?.map((item, i) => (
          <SwiperSlide>
            <Image
              margin="0 auto"
              maxWidth={isSmallerThan600 ? "350px" : "100%"}
              maxH="400px"
              src={item as string}
              alt={currentProduct?.title}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};
