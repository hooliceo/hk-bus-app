import { StopStateType } from "../page";

export const stopReducer = (state: StopStateType, action: any) => {
  switch (action.type) {
    case "stops":
      return { ...state, stops: action.data };
    case "details":
      return { ...state, details: action.details };
    default:
      return state;
  }
};
