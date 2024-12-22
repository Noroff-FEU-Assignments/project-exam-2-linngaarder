import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { userUrl } from "../../../Constants/Apis";
import createAxios from "../../../Functions/CreateAxios";
import AuthContext from "../../../Context/AuthContext";
import { HistoryProvider } from "../../../Context/HistoryContext";
import RefreshContext from "../../../Context/RefreshContext";
import UploadImageForm from "../../Forms/UploadImageForm/UploadImageForm";
import "./editprofileimage.style.scss";

function EditProfileImage({ handleShow, property, current = "" }) {
  //eslint-disable-next-line
  const [auth, setAuth] = useContext(AuthContext);
  const [refresh, setRefresh] = useContext(RefreshContext);
  const mediaUrl = userUrl + `/${auth.name}/media`;
  const [imageUrl, setImageUrl] = useState(current);

  useEffect(() => {
    if (imageUrl) {
      updateImage();
      handleShow(false);
    }
    //eslint-disable-next-line
  }, [imageUrl]);

  async function updateImage() {
    const client = createAxios(auth);

    try {
      await client.put(mediaUrl, { [property]: imageUrl });

      setRefresh(!refresh);
      handleShow();
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="edit-image-form flex-col full-width">
      <div>
        <HistoryProvider>
          <UploadImageForm
            imageUrlHandler={setImageUrl}
            handleShow={handleShow}
          />
        </HistoryProvider>
      </div>

      <div className="flex-row justify-between">
        {imageUrl && imageUrl !== current ? (
          <button type="button" className="system-btn" onClick={updateImage}>
            Update
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

EditProfileImage.propTypes = {
  handleShow: PropTypes.func,
  property: PropTypes.string.isRequired,
  current: PropTypes.string,
};

export default EditProfileImage;
