"use client";

import { useState, useEffect } from "react";
import {
  AccordionButton,
  AccordionIcon,
  Box,
  Skeleton,
} from "@chakra-ui/react";
import { useInView } from "react-intersection-observer";

const Stop = ({ id }: { id: string }) => {
  const [{ en }, setStop] = useState<{ [key: string]: string | undefined }>({});
  const [isLoading, setIsLoading] = useState(false);
  const { ref, inView } = useInView({ root: null, threshold: 0.5 });

  useEffect(() => {
    const getStop = async (stopID: string) => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://rt.data.gov.hk/v2/transport/citybus/stop/${stopID}`
        );

        const { data } = await res.json();

        setStop({
          en: data.name_en,
          tc: data.name_tc,
        });
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (inView) getStop(id);
  }, [id, inView]);

  return (
    <Skeleton isLoaded={!isLoading} startColor="#0282c7" endColor="#075985">
      <AccordionButton
        bg="#0282c7"
        _expanded={{ bg: "#036aa1" }}
        _hover={{ bg: "#075985" }}
        className="cursor-pointer"
        ref={ref}
        p={4}
      >
        <Box as="span" flex="0.9" textAlign="left" h="48px" overflow="scroll">
          {en}
        </Box>
        <AccordionIcon flex="0.1" />
      </AccordionButton>
    </Skeleton>
  );
};

export default Stop;
