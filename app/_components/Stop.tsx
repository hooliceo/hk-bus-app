"use client";

import { Box } from "@chakra-ui/react";
import Estimates from "./Estimates";
import StopName from "./StopName";
import { useInView } from "react-intersection-observer";

const Stop = ({ id }: { id: string }) => {
  const { ref, inView } = useInView({ root: null, threshold: 0.5 });

  return (
    <Box ref={ref}>
      <StopName id={id} inView={inView} />
      <Estimates id={id} inView={inView} />
    </Box>
  );
};

export default Stop;
