import PropTypes from "prop-types";

function validImageUrl(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.addEventListener("load", () => resolve(true));
    img.addEventListener("error", () => resolve(false));
  });
}

validImageUrl.propTypes = {
  url: PropTypes.string.isRequired,
};

export default validImageUrl;

