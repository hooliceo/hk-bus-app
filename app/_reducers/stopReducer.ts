import { StopStateType } from "../page";

export const stopReducer = (state: StopStateType, action: any) => {
  switch (action.type) {
    case "stops":
      return { ...state, stops: action.data };

    default:
      return state;
  }
};
