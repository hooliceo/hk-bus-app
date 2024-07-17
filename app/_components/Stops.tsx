import { StopType } from "../page";
import { Accordion, AccordionItem } from "@chakra-ui/react";
import Stop from "./Stop";
import Estimates from "./Estimates";

const Stops = ({
  direction,
  route,
  stops,
}: {
  direction: string;
  route: string;
  stops: Array<StopType>;
}) => {
  return (
    <Accordion allowToggle>
      {stops.map(({ stop }: { stop: string }) => {
        return (
          <AccordionItem mb={6} key={stop} border="none">
            {() => (
              <>
                <Stop id={stop} />
                <Estimates id={stop} direction={direction} route={route} />
              </>
            )}
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default Stops;
