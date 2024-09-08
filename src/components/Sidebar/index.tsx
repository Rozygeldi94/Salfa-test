import { FC, useEffect } from "react";
import { useActions } from "@/hooks/useActions";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { ISidebarFilter } from "@/store/products/dummyjson.com_slice";
import { IProduct } from "@/types/product.types";
import { getCategoriesAndBrands } from "@/utils/getCategoriesAndBrands";
import {
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Text,
  VStack,
} from "@chakra-ui/react";
import { SidebarAccordion } from "./SidebarAccordion";

interface ISidebarProps {
  products: IProduct[];
}

const favoritesItems = ["all", "favorites"];

export const Sidebar: FC<ISidebarProps> = ({ products }) => {
  const {
    setCategoryValue,
    setBrandValue,
    setPriceValue,
    setSidebarActive,
    selectFavoriteProducts,
  } = useActions();
  const sidebarFilterValues = useTypedSelector(
    (state) => state.products.sidebarFilter
  );
  const [storageValue, setValue] = useSessionStorage(
    "sidebarSelectedValues",
    []
  );
  const { categories, brands, prices } = getCategoriesAndBrands(
    storageValue as ISidebarFilter
  );
  console.log(storageValue);

  useEffect(() => {
    if (
      !sidebarFilterValues?.brand?.length ||
      !sidebarFilterValues?.category?.length
    ) {
      setCategoryValue(storageValue?.category);
      setBrandValue(storageValue?.brand);
    }
  }, []);

  const checkedCategories = categories.filter((item) => item.isChecked);
  const checkedBrands = brands.filter((item) => item.isChecked);
  console.log(storageValue?.category);

  return (
    <>
      <SidebarAccordion groupTitle="Favorites">
        <RadioGroup
          defaultValue={favoritesItems.includes("all") ? "all" : ""}
          onChange={(selectedFavoriteValue) => {
            selectFavoriteProducts(selectedFavoriteValue);
          }}
        >
          <VStack direction="column" align="flex-start">
            {favoritesItems?.map((item, index) => (
              <Radio value={item} key={index}>
                {item}
              </Radio>
            ))}
          </VStack>
        </RadioGroup>
      </SidebarAccordion>
      <SidebarAccordion groupTitle="Category">
        <CheckboxGroup
          defaultValue={storageValue?.category}
          onChange={(selectedCategoryValue) => {
            setCategoryValue(selectedCategoryValue);
            setValue({
              ...sidebarFilterValues,
              category: selectedCategoryValue,
            });
            setSidebarActive(true);
            const currentPagenationPage = document.querySelectorAll(
              ".pagenation-container li a"
            ) as NodeListOf<HTMLAnchorElement>;

            currentPagenationPage[1].click();
          }}
        >
          <VStack direction="column" align="flex-start">
            {categories?.map((item, index) => (
              <Checkbox value={item?.category} key={index}>
                {item?.category}
              </Checkbox>
            ))}
          </VStack>
        </CheckboxGroup>
      </SidebarAccordion>

      <SidebarAccordion groupTitle="Brand">
        <CheckboxGroup
          defaultValue={storageValue?.brand}
          onChange={(selectedBrandValue) => {
            setBrandValue(selectedBrandValue);
            setValue({
              ...sidebarFilterValues,
              brand: selectedBrandValue,
            });
            setSidebarActive(true);

            const currentPagenationPage = document.querySelectorAll(
              ".pagenation-container li a"
            ) as NodeListOf<HTMLAnchorElement>;
            currentPagenationPage[1].click();
          }}
        >
          <VStack direction="column" align="flex-start">
            {brands?.map((item, index) => (
              <Checkbox value={item?.brand} key={index}>
                {item.brand}
              </Checkbox>
            ))}
          </VStack>
        </CheckboxGroup>
      </SidebarAccordion>
      <SidebarAccordion groupTitle="Price">
        <RadioGroup
          onChange={(selectedPriceValue) => {
            setPriceValue(selectedPriceValue);
            setSidebarActive(true);
            const currentPagenationPage = document.querySelectorAll(
              ".pagenation-container li a"
            ) as NodeListOf<HTMLAnchorElement>;
            currentPagenationPage[1].click();
          }}
          value={sidebarFilterValues?.price}
        >
          <VStack direction="column" align="flex-start">
            {prices?.map((item, index) => (
              <Radio value={item} key={index}>
                <Text fontSize="0.9rem">{item}</Text>
              </Radio>
            ))}
          </VStack>
        </RadioGroup>
      </SidebarAccordion>
    </>
  );
};
