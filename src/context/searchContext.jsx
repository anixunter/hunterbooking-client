import { createContext, useReducer } from "react";
import { useEffect } from "react";

const sessionDates = JSON.parse(sessionStorage.getItem("dates"));
const startDate = sessionDates && new Date(sessionDates[0].startDate);
const endDate = sessionDates && new Date(sessionDates[0].endDate);

const INITIAL_STATE = {
  city: undefined,
  dates: [{ startDate, endDate }] || [],
  options: {
    adult: undefined,
    children: undefined,
    room: 1,
  },
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  useEffect(() => {
    sessionStorage.setItem("dates", JSON.stringify(state.dates));
  }, [state.dates]);

  return (
    <SearchContext.Provider
      value={{
        city: state.city,
        dates: state.dates,
        options: state.options,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
