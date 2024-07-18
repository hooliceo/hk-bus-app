"use client";

import { ChangeEvent, useEffect, useState, useReducer } from "react";
import Image from "next/image";
import { Box, Flex, Input } from "@chakra-ui/react";
import { stopReducer } from "./_reducers/stopReducer";
import Stops from "./_components/Stops";
import Direction from "./_components/Direction";
import Favorites from "./_components/Favorites";

export type StopType = { stop: string };

export interface StopStateType {
  stops: Array<StopType>;
}

const initialStopState: StopStateType = { stops: [] };

export default function Home() {
  const [history, setHistory] = useState<Array<string>>([]);
  const [route, setRoute] = useState<string>("");
  const [direction, setDirection] = useState("outbound");
  const [isLoading, setIsLoading] = useState(false);

  const [state, dispatch] = useReducer(stopReducer, initialStopState);
  const { stops } = state;

  // To set state if localStorage history exists
  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem("history") || "[]");

    if (!!storedHistory.length) setHistory(storedHistory);
  }, []);

  //Update localStorage as state changes
  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    let timeoutID: ReturnType<typeof setTimeout>;

    const fetchBus = async () => {
      try {
        const res = await fetch(
          `https://rt.data.gov.hk/v2/transport/citybus/route-stop/ctb/${route}/${direction}`
        );
        const { data } = await res.json();

        dispatch({ type: "stops", data });

        if (!!data.length)
          setHistory((prev) => {
            return !prev.includes(route) ? [...prev, route] : prev;
          });
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (!!route) {
      setIsLoading(true);

      timeoutID = setTimeout(() => fetchBus(), 300);
    }

    return () => {
      clearTimeout(timeoutID);
      setIsLoading(false);
    };
  }, [direction, route]);

  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setRoute(ev.target.value);
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
          src={"/hk-bus/ctbapp_logo.png"}
          width={65}
          height={65}
          alt="Citybus logo"
        />
      </Box>

      <Input
        variant="flushed"
        placeholder="Enter Route Number..."
        value={route}
        onChange={handleChange}
        w={["80%", null, "50%"]}
        py={8}
        mb={6}
        border="none"
        color="white"
        fontSize={["36px", null, "48px"]}
        textAlign="center"
      />

      <Direction
        direction={direction}
        isLoading={isLoading}
        setDirection={setDirection}
      />

      <Favorites
        history={history}
        setHistory={setHistory}
        setRoute={setRoute}
      />

      <Box className="text-white" w={["80%", null, "50%"]} py={4}>
        <Stops direction={direction} route={route} stops={stops} />
      </Box>
    </Flex>
  );
}
