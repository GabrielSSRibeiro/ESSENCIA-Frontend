import React, { useState } from "react";
import api from "../../../../../services/api";

import "./styles.css";
import deleteIcon from "../../../../../assets/edition/delete.png";
import checkIcon from "../../../../../assets/edition/check.png";

function GamesList({ history }) {
  const [gamesList, setGamesList] = useState([]);

  function StartGame(name) {
    localStorage.setItem("game", name);
    history.push("/gm-panel");
  }

  async function DeleteGame(name) {
    const user = localStorage.getItem("user");
    await api.delete("gm-games", { params: { user, name } });
  }

  function NewGameClick() {
    history.push("/dashboard-gm-list-new-game");
  }

  async function GMGamesList() {
    const user = localStorage.getItem("user");
    const response = await api.get("gm-games", { params: { user } });
    setGamesList(response.data);
  }
  GMGamesList();

  return (
    <>
      <div
        className="row align-items-center justify-content-center GMGames-list"
        style={{ display: gamesList.length > 0 ? "" : "none" }}
      >
        {gamesList.map(game => (
          <>
            <div key={game._id} className="col-auto GMGames-item-container">
              <img
                className="GMGames-check-img"
                onClick={() => StartGame(game.name)}
                src={checkIcon}
                alt="Icon made by Pixel perfect from www.flaticon.com"
              />
              <span className="GMGames-item">{game.name}</span>
              <img
                className="GMGames-delete-img"
                src={deleteIcon}
                onClick={() => DeleteGame(game.name)}
                alt="Icon made by kiranshastry from www.flaticon.com"
              />
            </div>
            <div className="w-100"></div>
          </>
        ))}
      </div>

      {/* no games found */}
      <h1 className="noGames-h1" style={{ display: gamesList.length > 0 ? "none" : "" }}>
        Você ainda não criou nenhuma jogo.
      </h1>
      <button className="std-button" onClick={NewGameClick}>
        Novo
      </button>
    </>
  );
}

export default GamesList;
