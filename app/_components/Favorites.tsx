import { HStack, Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";

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

      console.log(prev);

      return [...prev];
    });

    setRoute("");
  };

  return (
    <HStack w={["80%", null, "50%"]}>
      {history.map((entry, idx) => (
        <Tag
          variant="solid"
          colorScheme="whiteAlpha"
          key={entry}
          size={["md", "lg"]}
          cursor="pointer"
          onClick={() => handleClick(entry)}
        >
          <TagLabel>{entry}</TagLabel>
          <TagCloseButton onClick={(ev) => handleClose(ev, idx)} />
        </Tag>
      ))}
    </HStack>
  );
};

export default Favorites;
