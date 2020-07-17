import React, { useState } from "react";
import { useAuth } from "../../../../contexts/auth";

import NaviBar from "../../../../components/NaviBar";
import ReturnMenu from "../../../../components/ReturnMenu";

import { useLanguage } from "../../../../contexts/language";
import "./styles.css";

function NewPlayer({ history }) {
  const { content } = require(`./content/${useLanguage().language}`);
  const [playerUser, setPlayerUser] = useState();

  const { signedApiCall } = useAuth();

  function ReturnManagement() {
    history.push("/gm-management");
  }

  async function HandleSubmit(e) {
    e.preventDefault();

    const title = localStorage.getItem("game");
    const response = await signedApiCall("put", "gm-management", {
      title,
      playerUser,
    });

    if (response.data !== "") {
      if (response.data !== "member") {
        localStorage.setItem("game", title);
        history.push("/gm-management");
      } else {
        alert(content.alreadyIn);
      }
    } else {
      alert(content.notFound);
    }
  }

  return (
    <div className="newPlayer-container">
      <NaviBar history={history} />
      <ReturnMenu returnFunction={ReturnManagement} title={content.returnMenu} />
      <main>
        <form onSubmit={HandleSubmit}>
          <label>{content.label}</label>
          <input onChange={(e) => setPlayerUser(e.target.value)}></input>

          <button className="std-button">{content.button}</button>
        </form>
      </main>
    </div>
  );
}
export default NewPlayer;
