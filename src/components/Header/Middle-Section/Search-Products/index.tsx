import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Kbd,
  Text,
} from "@chakra-ui/react";
import {
  ChangeEventHandler,
  FC,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { BsSearch, BsXLg } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import debounce from "lodash.debounce";
import { useActions } from "@/hooks/useActions";
import { SearchModalContainer } from "./SearchModalContainer";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import { MainContext } from "@/pages/Layout";

interface ISearchProps {
  isMobile?: boolean;
  isVisible: boolean;
}

export const Search: FC<ISearchProps> = ({ isMobile = false, isVisible }) => {
  const { isModalOpen, setIsModalOpen } = useContext(MainContext);
  const searchInputValue = useTypedSelector(
    (state) => state.searchProducts.value
  );
  const [value, setValue] = useState(searchInputValue);
  const {
    updatedInputValue,
    resetInputValue,
    setSidebarActive,
    resetSidebarValues,
  } = useActions();

  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToResults = () => {
    if (innerWidth > 600) {
      document.addEventListener("keydown", (e) => {
        if (e.ctrlKey && e.code === "KeyK") {
          inputRef.current?.click();
          inputRef.current?.focus();
          e.preventDefault();
        }
      });
    }
  };

  useEffect(() => {
    scrollToResults();
    return () => {
      scrollToResults();
    };
  }, []);

  const callbackDebounce = useCallback(
    debounce((inputValue: string | number) => {
      updatedInputValue(inputValue);
      setSidebarActive(false);
      resetSidebarValues();
      const pop = document.querySelectorAll<HTMLElement>(
        ".css-1ey9w6j [data-checked]"
      );
      const pop1 = document.querySelectorAll<HTMLElement>(
        ".css-e9m96y[data-checked] div"
      );

      pop.forEach((el) => {
        el.removeAttribute("data-checked");
      });
      pop1.forEach((el) => {
        el.style.display = "none";
        el.click();
      });
    }, 1000),
    []
  );

  const updateInputValue: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
    inputRef.current?.click();
    callbackDebounce(e.target.value);
  };

  const resetInputValues = () => {
    setValue("");
    resetInputValue();
    inputRef.current?.focus();
  };

  const handleCloseModal = () => {
    setIsModalOpen((prev: boolean) => !prev);
  };

  return isMobile ? (
    <>
      <BiSearch
        id="header-search-input-logo"
        size="23px"
        height="23px"
        onClick={handleCloseModal}
      />
      {isModalOpen && <SearchModalContainer />}
    </>
  ) : (
    <InputGroup
      display={isVisible ? { base: "flex", isLargerThan600: "none" } : {}}
      size="sm"
      position="relative"
      className="searchInput"
    >
      <InputLeftElement id="header-search-input-logo" width="2rem">
        <BsSearch size="19px" />
      </InputLeftElement>
      <Input
        id="header-search-input"
        value={value}
        maxLength={100}
        placeholder="Title or Description"
        onChange={updateInputValue}
        ref={inputRef}
        border={"1px #386338 solid"}
        borderRadius={5}
        _hover={{ borderColor: "#3e2f55" }}
      />

      {value ? (
        <InputRightElement onClick={resetInputValues}>
          <BsXLg cursor="pointer" />
        </InputRightElement>
      ) : true ? (
        <Text position="absolute" top="2px" right="10px">
          <Kbd bg="#c0ccd8" padding="2px 5px">
            Ctrl
          </Kbd>
          <Kbd bg="#c0ccd8" padding="2px 5px">
            K
          </Kbd>
        </Text>
      ) : (
        ""
      )}
      <Text
        as="span"
        width="0"
        height="1px"
        position="absolute"
        left="50%"
        bottom="0"
        bg="#2208ca"
        transition="0.4s"
        sx={{
          ".searchInput:hover &": {
            width: "100%",
            height: "1px",
            left: "0",
            bottom: "0",
            transition: "0.4s",
          },
        }}
      ></Text>
    </InputGroup>
  );
};
