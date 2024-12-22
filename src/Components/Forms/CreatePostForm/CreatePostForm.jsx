import React, { useState, useContext } from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import createAxios from "../../../Functions/CreateAxios";
import AuthContext from "../../../Context/AuthContext";
import RefreshContext from "../../../Context/RefreshContext";
import { HistoryProvider } from "../../../Context/HistoryContext";
import PropTypes from "prop-types";
import BootstrapForm from "../BootStrapForm/BootstrapForm";
import CustomTextArea from "../CustomTextArea/CustomTextArea";
import PrimaryButton from "../../Buttons/PrimaryBtn";
import UploadImageForm from "../UploadImageForm/UploadImageForm";
import DisplayResponseErrors from "../../Messages/DisplayResponseError";

const BODY_LIMIT = 300;
const TITLE_LIMIT = 60;

const schema = yup.object().shape({
  title: yup
    .string()
    .required("Enter a title")
    .max(TITLE_LIMIT, "Title can't be more than 60 characters"),
  body: yup
    .string()
    .max(BODY_LIMIT, "Post body can't be more than 300 characters"),
  media: yup.string(),
});

function CreatePostForm({
  url,
  edit = null,
  close,
  postBodyId = "new-post-body",
}) {
  const [refresh, setRefresh] = useContext(RefreshContext);
  const [error, setError] = useState(null);
  function stopRunning() {
    setImageUrl("");
  }
  const [disabled, setDisabled] = useState(false);
  //eslint-disable-next-line
  const [auth, setAuth] = useContext(AuthContext);

  const [imageUrl, setImageUrl] = useState(
    edit && edit.media ? edit.media : ""
  );
  const removeImage = () => {
    setImageUrl("");
  };
  const [showAddImage, setShowAddImage] = useState(false);
  function handleShowAddImage() {
    setShowAddImage(!showAddImage);
  }

  const [currentBodyLength, setCurrentBodyLength] = useState(
    edit && edit.body ? edit.body.length : 0
  );
  const updateCurrentBodyLength = (e) => {
    const length = e.target.value.length;
    setCurrentBodyLength(length);
  };
  const [currentTitleLength, setCurrentTitleLength] = useState(
    edit && edit.title ? edit.title.length : 0
  );
  const updateCurrentTitleLength = (e) => {
    const length = e.target.value.length;
    setCurrentTitleLength(length);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onClose() {
    const form = document.querySelector("#new-post-form");
    form.querySelector("#new-post-title").value = "";
    form.querySelector(`#${postBodyId}`).value = "";
    stopRunning();
    if (close) {
      close();
    }
  }

  async function onSubmit(data) {
    setDisabled(true);
    const postBody = document.querySelector(`#${postBodyId}`).value;
    const client = createAxios(auth);

    try {
      if (imageUrl || imageUrl === "") {
        data.media = imageUrl;
      }
      if (postBody || postBody === "") {
        data.body = postBody;
      }
      if (edit) {
        await client.put(url, data);
      } else {
        await client.post(url, data);
      }
      setRefresh(!refresh);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setImageUrl("");
      setDisabled(false);
      stopRunning();

      if (close) {
        close();
      }
    }
  }

  return (
    <>
      <BootstrapForm
        id="new-post-form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex-col align-center full-width"
      >
        <fieldset
          disabled={disabled || showAddImage}
          className={`full-width standard-component-width p-4 radius-sm`}
        >
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              id="new-post-title"
              className="mb-2"
              {...register("title")}
              placeholder="Post title"
              defaultValue={edit ? edit.title : ""}
              maxLength={TITLE_LIMIT}
              onKeyUp={updateCurrentTitleLength}
            />
            <div className="flex-r full-width justify-end align-end">
              <span
                className={currentTitleLength < TITLE_LIMIT ? "small-text" : ""}
              >
                {currentTitleLength}
              </span>
              /{TITLE_LIMIT}
            </div>
            {errors.title ? <>{errors.title.message}</> : <div> </div>}
          </Form.Group>

          <Form.Group className="mb-3">
            <CustomTextArea
              placeholder="Write here.."
              id={postBodyId}
              name="body"
              defaultValue={edit && edit.body ? edit.body : ""}
              maxLength={BODY_LIMIT}
              onKeyUp={updateCurrentBodyLength}
            />
            <div className="flex-r full-width justify-end align-end">
              <span
                className={currentBodyLength < BODY_LIMIT ? "small-text" : ""}
              >
                {currentBodyLength}
              </span>
              /{BODY_LIMIT}
            </div>
          </Form.Group>
          <div className="new-post-menu flex-col gap-md align-center full-width">
            <div className="flex-r wrap gap-sm full-width">
              <PrimaryButton type="button" onClick={handleShowAddImage}>
                Add Image
              </PrimaryButton>
              {imageUrl && (
                <PrimaryButton className="system-btn" onClick={removeImage}>
                  Remove image
                </PrimaryButton>
              )}
            </div>
            <div className="flex-r gap-md justify-between align-center full-width">
              <div>
                {edit ? (
                  <PrimaryButton
                    type="button"
                    className="system-btn"
                    onClick={close}
                  >
                    Cancel
                  </PrimaryButton>
                ) : (
                  <PrimaryButton
                    type="button"
                    className="system-btn"
                    onClick={onClose}
                  >
                    Cancel
                  </PrimaryButton>
                )}
              </div>
              <div>
                {!disabled ? (
                  <PrimaryButton type="submit">Post</PrimaryButton>
                ) : (
                  <>Posting</>
                )}
              </div>
            </div>
          </div>
          {imageUrl && (
            <div className="mt-3">
              {/*eslint-disable-next-line*/}
              <img src={imageUrl} alt="your pick" />
            </div>
          )}
        </fieldset>
        {error && <DisplayResponseErrors data={error.response.data.errors} />}
      </BootstrapForm>
      {showAddImage && (
        <HistoryProvider>
          <UploadImageForm
            edit={edit && edit.media ? edit.media : ""}
            handleShow={handleShowAddImage}
            imageUrlHandler={setImageUrl}
          />
        </HistoryProvider>
      )}
    </>
  );
}

CreatePostForm.propTypes = {
  url: PropTypes.string.isRequired,
  edit: PropTypes.object,
  close: PropTypes.func,
  postBodyId: PropTypes.string,
};
export default CreatePostForm;
