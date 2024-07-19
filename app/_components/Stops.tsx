import { StopType } from "../page";
import { Accordion, AccordionItem } from "@chakra-ui/react";
import Stop from "./Stop";

const Stops = ({ stops }: { stops: Array<StopType> }) => {
  return (
    <Accordion allowToggle>
      {stops.map(({ stop }, i) => {
        return (
          <AccordionItem
            mb={6}
            key={`${stop}-${i}`}
            border="none"
            borderRadius="20px"
          >
            {() => <Stop id={stop} />}
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default Stops;
