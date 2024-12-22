import { createContext } from "react";
import PropTypes from "prop-types";
import useLocalStorage from "../Hooks/UseLocalStorage";

const HistoryContext = createContext([null, () => {}]);

export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useLocalStorage("history", null);

  return (
    <HistoryContext.Provider value={[history, setHistory]}>
      {children}
    </HistoryContext.Provider>
  );
};

HistoryProvider.propTypes = {
  children: PropTypes.node,
};

export default HistoryContext;
