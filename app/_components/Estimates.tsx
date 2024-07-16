"use client";

import { useCallback, useEffect, useState } from "react";
import { AccordionPanel, Spinner, Text, Flex } from "@chakra-ui/react";

const Estimates = ({ id, en, direction, route }: { [key: string]: string }) => {
  const [estimates, setEstimates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchETA = useCallback(
    async (stopID: string) => {
      try {
        setIsLoading(true);

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
    },
    [direction, route]
  );

  useEffect(() => {
    fetchETA(id);
  }, [id, fetchETA]);

  return (
    <AccordionPanel>
      {isLoading ? (
        <Flex justify="center" align="center" py={6}>
          <Spinner />
        </Flex>
      ) : estimates.length ? (
        estimates.map(({ eta }, i) => {
          const time = new Date(eta);

          return <div key={i}>{time.toLocaleTimeString("en-HK")}</div>;
        })
      ) : (
        <Text color="red">No ETA available</Text>
      )}
    </AccordionPanel>
  );
};

export default Estimates;
