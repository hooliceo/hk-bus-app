"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import { AccordionPanel, Spinner, Text, Flex } from "@chakra-ui/react";
import {
  EstimateContext,
  DirectionContext,
  RouteContext,
} from "../_contexts/contexts";

const Estimates = ({ id, inView }: { id: string; inView: boolean }) => {
  const [estimates, setEstimates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isRefetch, setIsRefetch } = useContext(EstimateContext);
  const direction = useContext(DirectionContext);
  const route = useContext(RouteContext);

  const fetchETA = useCallback(
    async (stopID: string) => {
      try {
        setIsLoading(true);

        const res = await fetch(
          `https://rt.data.gov.hk/v2/transport/citybus/eta/ctb/${stopID}/${route}`,
          { cache: "no-store" }
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
        setIsRefetch(false);
      }
    },
    [direction, route, setIsRefetch]
  );

  useEffect(() => {
    if (!!route) fetchETA(id);
  }, [id, route, fetchETA]);

  useEffect(() => {
    if (isRefetch && inView) fetchETA(id);
  }, [id, fetchETA, isRefetch, inView]);

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
