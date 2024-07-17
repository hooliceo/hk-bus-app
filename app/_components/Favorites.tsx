import {
  Box,
  Flex,
  HStack,
  Tag,
  TagCloseButton,
  TagLabel,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

const Favorites = ({
  history,
  setHistory,
  setRoute,
}: {
  history: Array<string>;
  setHistory: (arg0: (arg0: Array<string>) => Array<string>) => void;
  setRoute: (arg0: string) => void;
}) => {
  const handleClick = (route: string) => {
    setRoute(route);
  };

  const handleClose = (
    ev: React.MouseEvent<HTMLButtonElement>,
    idx: number
  ) => {
    ev.stopPropagation();

    setHistory((prev) => {
      prev.splice(idx, 1);

      return [...prev];
    });
  };

  const handleClear = () => {
    setHistory(() => []);
  };

  return (
    !!history.length && (
      <Flex w={["80%", null, "50%"]} justify="space-between">
        <HStack flexWrap="wrap">
          {history.map((entry, idx) => (
            <Tag
              variant="solid"
              colorScheme="whiteAlpha"
              key={entry}
              size={["sm", "lg"]}
              cursor="pointer"
              onClick={() => handleClick(entry)}
            >
              <TagLabel>{entry}</TagLabel>
              <TagCloseButton onClick={(ev) => handleClose(ev, idx)} />
            </Tag>
          ))}
        </HStack>

        {history.length >= 3 && (
          <Flex
            color="#E53E3E"
            align="center"
            cursor="pointer"
            onClick={handleClear}
          >
            <Box as="span" display={["none", "inline"]}>
              Clear
            </Box>
            <DeleteIcon ml={2} />
          </Flex>
        )}
      </Flex>
    )
  );
};

export default Favorites;
