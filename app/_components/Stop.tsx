import { AccordionButton, AccordionIcon, Box } from "@chakra-ui/react";

const Stop = ({ en }: { en: string }) => {
  return (
    <AccordionButton
      bg="#0282c7"
      _expanded={{ bg: "#036aa1" }}
      _hover={{ bg: "#075985" }}
      className="cursor-pointer"
    >
      <Box as="span" flex="1" textAlign="left">
        {en}
      </Box>
      <AccordionIcon />
    </AccordionButton>
  );
};

export default Stop;
