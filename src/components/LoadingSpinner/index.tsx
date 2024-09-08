import { Flex, Spinner } from "@chakra-ui/react";

const LoadingSpinner = () => {
  return (
    <Flex alignItems="center" justifyContent="center" height="100vh">
      <Spinner
        thickness="5px"
        speed="0.65s"
        emptyColor="rgba(57, 98, 232, 0.1)"
        color="#5a40f0"
        sx={{
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
    </Flex>
  );
};

export default LoadingSpinner;
