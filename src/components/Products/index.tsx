import { createContext, useEffect, useState } from "react";
import { Box, Container, Grid, useMediaQuery } from "@chakra-ui/react";
import { Sidebar } from "../Sidebar";
import { Pagination } from "./Pagination";
import { NothingFound } from "./NothingFound";
import { TextHelper } from "./TextHelper";
import { ProductCard } from "../ProductCard";
import { useLocation } from "react-router-dom";
import { useActions } from "@/hooks/useActions";
import { IProduct } from "@/types/product.types";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { fetchProducts } from "@/store/products/dummyjson.com_slice";
import { useSessionStorage } from "@/hooks/useSessionStorage";

export const productsContext = createContext(null);

export const Products = () => {
  const dispatch = useDispatch();
  const { products } = useTypedSelector((state) => state.products);

  useEffect(() => {
    if (!products?.length) {
      dispatch(fetchProducts());
    }
  }, []);

  const [isLargerThan767] = useMediaQuery("(min-width: 768px)");

  const sidebarFilterValues = useTypedSelector(
    (state) => state.products.sidebarFilter
  );
  const isSidebarActive = useTypedSelector(
    (state) => state.products?.isSidebarActive
  );
  const [list, setList] = useState<IProduct[]>(products);
  const searchInputValue = useTypedSelector(
    (state) => state.searchProducts.value
  );
  console.log(list);

  const { setSidebarActive } = useActions();
  const { setBrandValue } = useActions();
  const [storedValue, setStorageValue] = useSessionStorage(
    "sidebarSelectedValues",
    []
  );
  const location = useLocation();

  useEffect(() => {
    if (location.state?.brand.length) {
      setBrandValue([location.state?.brand || storedValue.brand]);
      setStorageValue({
        ...sidebarFilterValues,
        brand: [location.state?.brand],
      });
      setSidebarActive(true);
    }
  }, []);

  useEffect(() => {
    const filteredData = () => {
      let filteredProducts = products as IProduct[];
      if (sidebarFilterValues?.category?.length) {
        console.log(1);

        filteredProducts = filteredProducts?.filter((product) =>
          sidebarFilterValues?.category.includes(product.category.toLowerCase())
        );
      }
      if (sidebarFilterValues?.brand?.length) {
        console.log(2);

        filteredProducts = filteredProducts?.filter((product) => {
          const shortProductTitle = product?.brand?.toLowerCase();
          const lowercasedBrands = sidebarFilterValues?.brand?.map((item) =>
            (item as string)?.toLowerCase()
          );
          return lowercasedBrands?.includes(
            shortProductTitle ? shortProductTitle : ""
          );
        });
      }
      if (sidebarFilterValues?.price) {
        console.log(3);

        filteredProducts = filteredProducts?.filter((product) => {
          const filtredPrice = sidebarFilterValues?.price.match(/\d+/g);
          if (filtredPrice) {
            return (
              product.price >= +filtredPrice[0] &&
              product.price <= +filtredPrice[1]
            );
          }
        });
      }
      console.log(filteredProducts);

      setList(filteredProducts);
    };
    filteredData();
  }, [
    products,
    sidebarFilterValues?.category,
    sidebarFilterValues?.brand,
    sidebarFilterValues?.price,
  ]);

  //page pagination ---start
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 12;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = list?.slice(itemOffset, endOffset);
  console.log(list);

  const pageCount = Math.ceil(list?.length / itemsPerPage);

  const handlePageClick = ({ selected }: { selected: number }) => {
    const newOffset = (selected * itemsPerPage) % list?.length;
    setItemOffset(newOffset);
  };
  //page pagination ---end

  let res3: JSX.Element | JSX.Element[];

  if ((currentItems?.length && isSidebarActive) || currentItems?.length) {
    res3 = currentItems?.map((product) => (
      <ProductCard product={product} key={product.id} />
    ));
  } else if (list?.length) {
    res3 = list?.map((product) => (
      <ProductCard product={product} key={product.id} />
    ));
  } else {
    res3 = <NothingFound />;
  }

  const res3Length = Array.isArray(res3) ? res3.length : 0;
  console.log(res3);

  return (
    <>
      <Container
        id="products"
        display="flex"
        gap="15px"
        maxWidth="1230px"
        padding={{ base: "0 10px", isLargerThan440: "0 15px" }}
        margin="20px auto"
      >
        {isLargerThan767 && (
          <Box as="aside" width="250px">
            <Box
              width="250px"
              position="sticky"
              top="75px"
              overflowY="auto"
              style={{ height: "calc(100vh - 70px)" }}
            >
              <Sidebar products={products as IProduct[]} />
            </Box>
          </Box>
        )}

        <Box flexGrow="1" alignSelf="flex-start">
          <TextHelper
            list={list}
            searchInputValue={searchInputValue}
            sidebarFilterValues={sidebarFilterValues}
            currentItems={currentItems}
          />

          <Grid
            id="products-wrap"
            mt="20px"
            gridTemplateColumns={
              res3Length >= 1 && res3Length < 4
                ? { sm: "repeat(4, 1fr)" }
                : {
                    sm: "repeat(auto-fit, minmax(210px, 1fr))",
                  }
            }
            justifyContent="center"
            gap="20px"
          >
            {res3}
          </Grid>
        </Box>
      </Container>
      <Pagination handlePageClick={handlePageClick} pageCount={pageCount} />
    </>
  );
};
