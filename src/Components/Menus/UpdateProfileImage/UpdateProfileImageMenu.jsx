import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import createAxios from "../../../Functions/CreateAxios";
import { userUrl } from "../../../Constants/Apis";
import AuthContext from "../../../Context/AuthContext";
import RefreshContext from "../../../Context/RefreshContext";
import EditProfileImage from "../EditProfileImageMenu/EditProfileImage";
import PrimaryButton from "../../Buttons/PrimaryBtn";

function UpdateProfileImageMenu({ user, handleRefresh }) {
  const [auth] = useContext(AuthContext);
  const [showAvatarForm, setShowAvatarForm] = useState(false);
  const handleShowAvatarForm = () => setShowAvatarForm(!showAvatarForm);
  const [refresh, setRefresh] = useContext(RefreshContext);

  const [showBannerForm, setShowBannerForm] = useState(false);
  const handleShowBannerForm = () => setShowBannerForm(!showBannerForm);

  const mediaUrl = userUrl + `/${auth.name}/media`;

  const removeImage = async (property) => {
    const client = createAxios(auth);

    try {
      await client.put(mediaUrl, { [property]: "" });
      setRefresh(!refresh);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="profile-image-menu flex-col standard-component-width gap-md">
      <div className="flex-r full-width justify-around wrap align-center gap-md">
        <PrimaryButton onClick={handleShowAvatarForm}>
          Update avatar
        </PrimaryButton>
        <PrimaryButton
          className="system-btn"
          onClick={() => removeImage("avatar")}
        >
          Remove avatar
        </PrimaryButton>
      </div>
      <div className="flex-r justify-around wrap align-center gap-md">
        <PrimaryButton onClick={handleShowBannerForm}>
          Update banner
        </PrimaryButton>
        <PrimaryButton
          className="system-btn"
          onClick={() => removeImage("banner")}
        >
          Remove banner
        </PrimaryButton>
      </div>
      <Modal show={showAvatarForm} onHide={handleShowAvatarForm}>
        <EditProfileImage property="avatar" handleShow={handleShowAvatarForm} />
      </Modal>
      <Modal show={showBannerForm} onHide={handleShowBannerForm}>
        <EditProfileImage property="banner" handleShow={handleShowBannerForm} />
      </Modal>
    </div>
  );
}

UpdateProfileImageMenu.propTypes = {
  user: PropTypes.object.isRequired,
  handleRefresh: PropTypes.func.isRequired,
};
export default UpdateProfileImageMenu;
