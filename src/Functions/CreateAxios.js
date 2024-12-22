import axios from "axios";
import PropTypes from "prop-types";

function createAxios(auth) {
  const client = axios.create();
  if (auth) {
    client.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${auth.accessToken}`;
  }

  return client;
}

createAxios.propTypes = {
  auth: PropTypes.object,
};

export default createAxios;
