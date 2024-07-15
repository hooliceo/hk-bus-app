"use client";

import { useState } from "react";
import { Details } from "../page";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Skeleton,
  SkeletonText,
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
      setIsLoading(true);

      const res = await fetch(
        `https://rt.data.gov.hk/v2/transport/citybus/eta/ctb/${stopID}/${route}`
      );
      const { data } = await res.json();

      setEstimates(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Accordion p={4} allowToggle>
      {details.map(({ id, en }: { id: string; en: string }) => {
        return (
          <AccordionItem key={id}>
            {({ isExpanded }) => (
              <>
                <AccordionButton
                  className="cursor-pointer"
                  onClick={() => !isExpanded && fetchETA(id)}
                >
                  {en}
                  <AccordionIcon />
                </AccordionButton>

                <AccordionPanel>
                  {isLoading
                    ? estimates
                        .filter(({ stop, dir }) =>
                          direction == "outbound" ? dir == "O" : dir == "I"
                        )
                        .map((_, i) => (
                          <SkeletonText
                            key={i}
                            mt="4"
                            noOfLines={1}
                            spacing="4"
                            skeletonHeight="3"
                            w={24}
                          />
                        ))
                    : estimates
                        .filter(({ stop, dir }) =>
                          direction == "outbound" ? dir == "O" : dir == "I"
                        )
                        .map(({ eta }, i) => {
                          const time = new Date(eta);

                          return (
                            <div key={i}>
                              {time.toLocaleTimeString("en-HK")}
                            </div>
                          );
                        })}
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
