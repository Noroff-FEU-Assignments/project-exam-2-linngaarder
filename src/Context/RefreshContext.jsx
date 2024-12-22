import { useState } from "react";
import { createContext } from "react";
import PropTypes from "prop-types";

const RefreshContext = createContext([null, () => {}]);

export const RefreshProvider = (props) => {
  const [refresh, setRefresh] = useState(true);

  return (
    <RefreshContext.Provider value={[refresh, setRefresh]}>
      {props.children}
    </RefreshContext.Provider>
  );
};

RefreshProvider.propTypes = {
  children: PropTypes.node,
};

export default RefreshContext;
