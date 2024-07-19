import { createContext } from "react";

export interface EsimateContextType {
  isRefetch: boolean;
  setIsRefetch: (arg0: boolean) => void;
}

export const EstimateContext = createContext<EsimateContextType>({
  isRefetch: false,
  setIsRefetch: () => {},
});

export const DirectionContext = createContext<"outbound" | "inbound">(
  "outbound"
);

export const RouteContext = createContext("");
