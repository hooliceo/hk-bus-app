"use client";

import {
  ChangeEvent,
  useEffect,
  useState,
  useReducer,
  Suspense,
  lazy,
} from "react";
import { Select, Input } from "@chakra-ui/react";
import { stopReducer } from "./_reducers/stopReducer";
import Loading from "./_components/Loading";

const Estimates = lazy(() => import("./_components/Estimates"));

export type Details = Array<{ id: string; en: string; tc: string }>;
export type Stops = Array<{ stop: string }>;

export interface StopStateType {
  stops: Stops;
  details: Details;
}

const initialStopState: StopStateType = { stops: [], details: [] };

export default function Home() {
  const [route, setRoute] = useState("");
  const [direction, setDirection] = useState("inbound");

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
      timeoutID = setTimeout(() => fetchBus(), 600);
    }

    return () => clearTimeout(timeoutID);
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
    <main className="p-4">
      <Input
        placeholder="Enter Route Number..."
        value={route}
        onChange={handleChange}
        w={["100%", "50%"]}
        mb={4}
        bg="white"
      />
      <Select
        value={direction}
        onChange={handleSelect}
        w={["100%", "50%"]}
        bg="white"
      >
        <option value="inbound">Inbound</option>
        <option value="outbound">Outbound</option>
      </Select>

      <div className="text-white">
        <Suspense fallback={<Loading />}>
          <Estimates details={details} route={route} />
        </Suspense>
      </div>
    </main>
  );
}
