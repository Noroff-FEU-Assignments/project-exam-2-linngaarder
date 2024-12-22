import React, { useState, useContext } from "react";
import { postsUrl } from "../../../Constants/Apis";
import createAxios from "../../../Functions/CreateAxios";
import AuthContext from "../../../Context/AuthContext";
import RefreshContext from "../../../Context/RefreshContext";
import BootstrapForm from "../BootStrapForm/BootstrapForm";
import "./reactionform.style.scss";

const reactionsArray = [
  {
    code: "U+1F44D",
    symbol: "👍",
    name: "thumbs up",
  },

  {
    code: "U+1F44E",
    symbol: "👎",
    name: "thumbs down",
  },

  {
    code: "U+1F602",
    symbol: "😂",
    name: "cry laughing",
  },
  {
    code: "U+2764",
    symbol: "❤️",
    name: "heart",
  },
];

function ReactionForm({ postID }) {
  const url = `${postsUrl}/${postID}/react`;
  //eslint-disable-next-line
  const [auth, setAuth] = useContext(AuthContext);
  const [disabled, setDisabled] = useState(false);
  const client = createAxios(auth);
  const [refresh, setRefresh] = useContext(RefreshContext);
  async function sendReaction(e) {
    e.preventDefault();
    setDisabled(true);
    const symbol = e.target.dataset.symbol;
    try {
      await client.put(url + `/${symbol}`);
      setRefresh(!refresh);
    } catch (error) {
      console.error(error);
    } finally {
      setDisabled(false);
    }
  }

  return (
    <BootstrapForm>
      <fieldset disabled={disabled} className="reaction-form p-3 radius-sm">
        <div className="symbols flex-r wrap gap-md justify-evenly align-center">
          {reactionsArray.map((reaction) => {
            return (
              <button
                type="button"
                className="distinct"
                value={reaction.name}
                data-symbol={reaction.symbol}
                onClick={sendReaction}
                key={reaction.name}
              >
                {reaction.symbol}
              </button>
            );
          })}
        </div>
      </fieldset>
    </BootstrapForm>
  );
}

export default ReactionForm;
