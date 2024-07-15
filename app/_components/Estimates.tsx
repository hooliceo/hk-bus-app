"use client";

import { useState } from "react";
import { Details } from "../page";

const Estimates = ({ details, route }: { details: Details; route: string }) => {
  const [estimates, setEstimates] = useState([]);

  const fetchETA = async (stopID: string) => {
    const res = await fetch(
      `https://rt.data.gov.hk/v2/transport/citybus/eta/ctb/${stopID}/${route}`
    );
    const { data } = await res.json();

    setEstimates(data);
  };

  console.log(details);

  return (
    <div className="p-4">
      {details.map(({ id, en }: { id: string; en: string }) => {
        return (
          <div key={id}>
            <div className="cursor-pointer" onClick={() => fetchETA(id)}>
              {en}
            </div>

            <div>
              {estimates.find(({ stop }) => {
                return id === stop;
              }) &&
                estimates.map(({ eta, eta_seq }) => {
                  const time = new Date(eta);

                  return (
                    <div key={eta_seq}>{time.toLocaleTimeString("en-HK")}</div>
                  );
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Estimates;
