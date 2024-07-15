"use client";

import { ChangeEvent, useEffect, useState, useReducer } from "react";
import Image from "next/image";
import { Box, Flex, Input, Select, Spinner } from "@chakra-ui/react";
import { stopReducer } from "./_reducers/stopReducer";
import Estimates from "./_components/Estimates";

export type Details = Array<{ id: string; en: string; tc: string }>;
export type Stops = Array<{ stop: string }>;

export interface StopStateType {
  stops: Stops;
  details: Details;
}

const initialStopState: StopStateType = { stops: [], details: [] };

export default function Home() {
  const [route, setRoute] = useState("");
  const [direction, setDirection] = useState("outbound");
  const [isLoading, setIsLoading] = useState(false);

  const [state, dispatch] = useReducer(stopReducer, initialStopState);
  const { stops, details } = state;

  useEffect(() => {
    let timeoutID: ReturnType<typeof setTimeout>;

    const fetchBus = async () => {
      try {
        const res = await fetch(
          `https://rt.data.gov.hk/v2/transport/citybus/route-stop/ctb/${route}/${direction}`
        );
        const { data } = await res.json();

        dispatch({ type: "stops", data });
      } catch (err) {
        console.log(err);
      }
    };

    if (!!route) {
      setIsLoading(true);

      timeoutID = setTimeout(() => fetchBus(), 600);
    }

    return () => {
      clearTimeout(timeoutID);
      setIsLoading(false);
    };
  }, [direction, route]);

  useEffect(() => {
    const fetchStopDetail = async () => {
      try {
        const stopData = stops.map(async ({ stop }: { stop: string }) => {
          const res = await fetch(
            `https://rt.data.gov.hk/v2/transport/citybus/stop/${stop}`
          );

          const { data } = await res.json();

          return {
            id: stop,
            en: data.name_en,
            tc: data.name_tc,
          };
        });

        dispatch({ type: "details", details: await Promise.all(stopData) });
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (!!stops.length) fetchStopDetail();
  }, [stops, dispatch]);

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setRoute(ev.target.value);
  };

  const handleSelect = (ev: ChangeEvent<HTMLSelectElement>) => {
    setDirection(ev.target.value);
  };

  return (
    <Flex
      py={8}
      direction="column"
      justify="center"
      align="center"
      overflow="scroll"
    >
      <Box mb={8}>
        <Image
          src="/ctbapp_logo.png"
          width={50}
          height={50}
          alt="Citybus logo"
        />
      </Box>

      <Input
        variant="flushed"
        placeholder="Enter Route Number..."
        value={route}
        onChange={handleChange}
        w={["80%", null, "50%"]}
        p={4}
        mb={4}
        border="none"
        color="white"
        fontSize="24px"
        textAlign="center"
      />
      <Select
        variant="unstyled"
        cursor="pointer"
        value={direction}
        onChange={handleSelect}
        w={["80%", null, "50%"]}
        color="#fff"
        textAlign="center"
        fontSize="24px"
        mb={4}
      >
        <option value="inbound">INBOUND</option>
        <option value="outbound">OUTBOUND</option>
      </Select>

      <Box className="text-white" w={["80%", null, "50%"]} py={4}>
        {isLoading ? (
          <Flex justify="center" align="center">
            <Spinner />
          </Flex>
        ) : (
          <Estimates details={details} direction={direction} route={route} />
        )}
      </Box>
    </Flex>
  );
}
