import { useEffect, useRef } from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  FormControl,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useActions } from "@/hooks/useActions";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { fetchProducts } from "@/store/products/dummyjson.com_slice";
import { useDispatch } from "react-redux";

// Validation Schema
const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Product's title is required")
    .max(
      50,
      "The Product's title character must be no longer than 50 characters"
    ),
  brand: Yup.string()
    .required("Product's brand is required")
    .max(
      40,
      "The Product's brand character must be no longer than 40 characters"
    ),

  stock: Yup.number().required("Stock is required"),
  rating: Yup.number()
    .required("Rating is required")
    .max(5, "Rating cannot be greater than 5"),
  price: Yup.number().required("Price is required"),
});

// Enum for Form Fields
enum ECreateProductForm {
  TITLE = "title",
  BRAND = "brand",
  STOCK = "stock",
  RATING = "rating",
  PRICE = "price",
  IMG = "images",
}

// Interface for Form Data
export interface ICreateProductForm {
  [ECreateProductForm.TITLE]: string;
  [ECreateProductForm.BRAND]: string;
  [ECreateProductForm.RATING]: number | string;
  [ECreateProductForm.STOCK]: number | string;
  [ECreateProductForm.PRICE]: number | string;
  [ECreateProductForm.IMG]: FileList | null;
}

export const CreateProduct = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ICreateProductForm>({ resolver: yupResolver(validationSchema) });
  const { products } = useTypedSelector((state) => state.products);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!products?.length) {
      dispatch(fetchProducts());
    }
  }, [products?.length, dispatch]);

  const { createProduct: createProductAction } = useActions();

  const createProduct: SubmitHandler<ICreateProductForm> = (data) => {
    createProductAction({
      id: products?.length + 1,
      title: data[ECreateProductForm.TITLE],
      description: "",
      category: "others",
      price: data[ECreateProductForm.PRICE],
      discountPercentage: 0,
      brand: data[ECreateProductForm.BRAND],
      stock: data[ECreateProductForm.STOCK],
      rating: data[ECreateProductForm.RATING],
      images:
        data[ECreateProductForm.IMG] !== null
          ? data[ECreateProductForm.IMG].length > 0
            ? [URL.createObjectURL(data[ECreateProductForm.IMG][0])]
            : []
          : [],

      thumbnail: [],
      reviews: [],
    });
    reset({
      title: "",
      brand: "",
      rating: "",
      stock: "",
      price: "",
      images: null,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast({
      title: "Product created!",
      status: "success",
      position: "top",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box maxWidth="1230px" margin="20px auto" padding="0 15px">
      <Box minWidth="300px" maxWidth="400px" m="50px auto" padding="0 15px">
        <Box
          width="100%"
          p="20px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="15px"
          borderRadius="3px"
          background="#17af2d"
        >
          <Heading fontSize="1.5rem" color="#343333" textAlign="center" as="h3">
            Create a product
          </Heading>
          <form
            onSubmit={handleSubmit(createProduct)}
            style={{
              width: "80%",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <FormControl isInvalid={!!errors[ECreateProductForm.TITLE]}>
              <Input
                maxLength={50}
                w="100%"
                p="8px 15px"
                color="#343333"
                type="text"
                borderRadius="5px"
                border="none"
                outline="none"
                placeholder="Product title"
                _placeholder={{ color: "#504c90" }}
                bg="#e0e6f2"
                {...register(ECreateProductForm.TITLE)}
              />
              <FormErrorMessage>
                {errors[ECreateProductForm.TITLE]?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors[ECreateProductForm.BRAND]}>
              <Input
                maxLength={40}
                w="100%"
                p="8px 15px"
                color="#343333"
                type="text"
                borderRadius="5px"
                border="none"
                outline="none"
                placeholder="Product brand"
                _placeholder={{ color: "#504c90" }}
                bg="#e0e6f2"
                {...register(ECreateProductForm.BRAND)}
              />
              <FormErrorMessage>
                {errors[ECreateProductForm.BRAND]?.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors[ECreateProductForm.PRICE]}>
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    max={1000000000}
                    w="100%"
                    p="8px 15px"
                    color="#343333"
                    type="number"
                    borderRadius="5px"
                    border="none"
                    outline="none"
                    placeholder="Product price"
                    _placeholder={{ color: "#504c90" }}
                    bg="#e0e6f2"
                    maxLength={6}
                  />
                )}
              />
              <FormErrorMessage>
                {errors[ECreateProductForm.PRICE]?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors[ECreateProductForm.RATING]}>
              <Controller
                name="rating"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    max={5}
                    w="100%"
                    p="8px 15px"
                    color="#343333"
                    type="number"
                    borderRadius="5px"
                    border="none"
                    outline="none"
                    placeholder="Rating from 1 to 5"
                    _placeholder={{ color: "#504c90" }}
                    bg="#e0e6f2"
                  />
                )}
              />

              <FormErrorMessage>
                {errors[ECreateProductForm.RATING]?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors[ECreateProductForm.STOCK]}>
              <Controller
                name="stock"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    w="100%"
                    p="8px 15px"
                    color="#343333"
                    type="number"
                    borderRadius="5px"
                    border="none"
                    outline="none"
                    placeholder="Quantity in stock"
                    _placeholder={{ color: "#504c90" }}
                    bg="#e0e6f2"
                  />
                )}
              />
              <FormErrorMessage>
                {errors[ECreateProductForm.STOCK]?.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors[ECreateProductForm.IMG]}>
              <Controller
                name="images"
                control={control}
                render={() => (
                  <Input
                    type="file"
                    accept="image/*"
                    borderRadius="5px"
                    border="none"
                    outline="none"
                    bg="#e0e6f2"
                    {...register(ECreateProductForm.IMG)}
                  />
                )}
              />
              <FormErrorMessage>
                {errors[ECreateProductForm.IMG]?.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              w="100%"
              color="#e0e6f2"
              colorScheme="facebook"
              borderRadius="5px"
              fontSize="1.2rem"
              fontWeight="400"
              p="10px"
              type="submit"
            >
              Create Product
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};
