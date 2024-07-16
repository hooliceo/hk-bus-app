"use client";

import { Details } from "../page";
import { Accordion, AccordionItem } from "@chakra-ui/react";
import Stop from "./Stop";
import Estimates from "./Estimates";

const Stops = ({
  details,
  direction,
  route,
}: {
  details: Details;
  direction: string;
  route: string;
}) => {
  return (
    <Accordion allowToggle>
      {details.map(({ id, en }: { id: string; en: string }) => {
        return (
          <AccordionItem mb={4} key={id} border="none">
            {() => (
              <>
                <Stop en={en} />
                <Estimates
                  id={id}
                  en={en}
                  direction={direction}
                  route={route}
                />
              </>
            )}
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default Stops;
