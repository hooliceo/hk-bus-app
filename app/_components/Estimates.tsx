"use client";

import { useState } from "react";
import { Details } from "../page";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Spinner,
  Text,
} from "@chakra-ui/react";

const Estimates = ({
  details,
  direction,
  route,
}: {
  details: Details;
  direction: string;
  route: string;
}) => {
  const [estimates, setEstimates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchETA = async (stopID: string) => {
    try {
      const res = await fetch(
        `https://rt.data.gov.hk/v2/transport/citybus/eta/ctb/${stopID}/${route}`
      );
      const { data } = await res.json();

      setEstimates(
        data.filter(({ dir }: { dir: "I" | "O" }) =>
          direction == "outbound" ? dir == "O" : dir == "I"
        )
      );
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Accordion allowToggle>
      {details.map(({ id, en }: { id: string; en: string }) => {
        return (
          <AccordionItem key={id} mb={4} border="none">
            {({ isExpanded }) => (
              <>
                <AccordionButton
                  bg="#373737"
                  _expanded={{ bg: "#1781E5", color: "#FFF" }}
                  className="cursor-pointer"
                  onClick={() => {
                    setIsLoading(true);

                    !isExpanded && fetchETA(id);
                  }}
                >
                  <Box as="span" flex="1" textAlign="left">
                    {en}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>

                <AccordionPanel>
                  {isLoading ? (
                    <Spinner />
                  ) : estimates.length ? (
                    estimates.map(({ eta }, i) => {
                      const time = new Date(eta);

                      return (
                        <div key={i}>{time.toLocaleTimeString("en-HK")}</div>
                      );
                    })
                  ) : (
                    <Text color="red">No ETA available</Text>
                  )}
                </AccordionPanel>
              </>
            )}
          </AccordionItem>
        );
      })}
    </Accordion>
  );
};

export default Estimates;
