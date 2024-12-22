import React, { useState } from "react";
import createAxios from "../../../Functions/CreateAxios";
import PropTypes from "prop-types";
import BootstrapForm from "../BootStrapForm/BootstrapForm";
import FileInput from "./FileInput";
import PrimaryButton from "../../Buttons/PrimaryBtn";
import Message from "../../Messages/Message";

function UploadImageForm({ imageUrlHandler, handleShow, edit = "" }) {
  //eslint-disable-next-line
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  async function handleImage(e) {
    setLoading(true);
    e.preventDefault();

    const fileInput = document.querySelector("#file-input");
    try {
      if (fileInput.files[0]) {
        const url = await doUpload(fileInput.files[0]);
        if (url) {
          setImageUrl(url);
          imageUrlHandler(url);
          handleShow();
        }
      }
    } catch (error) {
      console.error(error);
      setFormError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <BootstrapForm
      onSubmit={handleImage}
      className="add-image full-width flex-col"
    >
      <fieldset disabled={loading} className="p-4 flex-col gap-sm">
        <div className="inputs flex-col gap-sm">
          <FileInput resultHandler={setImageUrl} className="mb-3" />
        </div>
        <div className="menu flex-r full-width wrap justify-between align-center">
          {formError && (
            <Message type="error">Whops! Something went wrong</Message>
          )}
          <PrimaryButton type="button" onClick={handleShow}>
            Cancel
          </PrimaryButton>
          {!loading ? (
            <PrimaryButton type="submit">Confirm</PrimaryButton>
          ) : (
            <>Checking image</>
          )}
        </div>
      </fieldset>
    </BootstrapForm>
  );
}

UploadImageForm.propTypes = {
  imageUrlHandler: PropTypes.func.isRequired,
  handleShow: PropTypes.func.isRequired,
  edit: PropTypes.string,
};

export default UploadImageForm;

async function doUpload(file) {
  const client = createAxios();
  const formData = new FormData();

  const preset = "at7y756j";
  const cloud = "dozzn3tgj";

  formData.append("file", file);
  formData.append("upload_preset", preset);

  try {
    const response = await client.post(
      `https://api.cloudinary.com/v1_1/${cloud}/image/upload`,
      formData
    );
    if (response.data.url) {
      return response.data.url;
    }
  } catch (error) {
    console.error(error);
  }
}
