import { createContext, useState } from "react";
import PropTypes from "prop-types";

const ShowNewPostContext = createContext(null, () => {});

export const ShowNewPostContextProvider = ({ children }) => {
  const [showNewPost, setShowNewPost] = useState(false);

  return (
    <ShowNewPostContext.Provider value={[showNewPost, setShowNewPost]}>
      {children}
    </ShowNewPostContext.Provider>
  );
};

ShowNewPostContext.propTypes = {
  children: PropTypes.node,
};

export default ShowNewPostContext;
