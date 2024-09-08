import { useTypedSelector } from "@/hooks/useTypedSelector";
import { ISidebarFilter } from "@/store/products/dummyjson.com_slice";
import { IProduct } from "@/types/product.types";
import { FC, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

export const getCategoriesAndBrands = (storageValue: ISidebarFilter) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const { products } = useTypedSelector((state) => state.products);
  const prices = [
    "0 TL - 60 TL",
    "61 TL - 150 TL",
    "151 TL - 300 TL",
    "301 TL - 600 TL",
    "601 TL - 2500 TL",
    "2501 TL - 10000 TL",
  ];

  const temporaryCategories = [
    ...new Map(
      products?.map((item: IProduct) => [item.category, item.category])
    ).values(),
  ] as string[];

  const temporaryBrands = [
    ...new Map(
      products?.map((item: IProduct) => [item.brand, item.brand])
    ).values(),
  ] as string[];

  const categories = temporaryCategories.map((category) => {
    if (storageValue?.category?.length > 0) {
      if (storageValue?.category?.includes(category.toLowerCase())) {
        return { category: category, isChecked: true };
      } else {
        return { category: category };
      }
    } else {
      return { category: category };
    }
  });
  const brands = temporaryBrands.map((brand) => {
    const storedBrands = storageValue?.brand?.map((item) =>
      (item as string)?.toLowerCase()
    );

    if (storedBrands?.length > 0) {
      if (storedBrands?.includes(brand?.toLowerCase())) {
        return { brand: brand, isChecked: true };
      } else {
        return { brand: brand };
      }
    } else {
      return { brand: brand };
    }
  });
  useEffect(() => {
    if (location.pathname.includes("special_offers")) {
      setSearchParams((prev) => {
        prev.set(
          "q",
          storageValue?.brand.length
            ? (storageValue?.brand[0] as string)
            : "All"
        );
        return prev;
      });
    }
  }, [storageValue?.brand]);

  return { categories, brands, prices };
};
