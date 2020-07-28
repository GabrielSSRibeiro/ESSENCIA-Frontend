import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/auth";

import NaviBar from "../../components/NaviBar";
import MembersBar from "../../components/MembersBar";
import PlayerMenu from "./components/PlayerMenu";
import MainNode from "../../components/Nodes/MainNode";
import ActionButtonActive from "./components/Actions/ActionButtonActive";
import ActionButton from "./components/Actions/ActionButton";
import Status from "./components/Status";
import StatDisplay from "../../components/Nodes/StatDisplay";
import StatSection from "../../components/Nodes/StatSection";
import PanelPortrait from "../../components/PanelPortrait";

import { useLanguage } from "../../contexts/language";
import "./styles.css";

function PlayerPanel({ history }) {
  const { content } = require(`./content/${useLanguage().language}`);
  const [display, setDisplay] = useState("default");
  const [action, setAction] = useState(false);
  const [player, setPlayer] = useState();

  const { signedApiCall } = useAuth();

  // const playerClass = require(`./components/${player.class}`)

  const stats = {
    skill: <StatSection />,
    combat: <StatSection />,
    magic: <StatSection />,
  };

  useEffect(() => {
    const GM = localStorage.getItem("GM");
    const title = localStorage.getItem("game");

    function PlayerData() {
      signedApiCall("get", "player-character", { params: { GM, title } }).then((response) => {
        setPlayer(response.data);
      });
    }

    PlayerData();
  }, [signedApiCall]);

  useEffect(() => {
    //get GM signal por action time
    setAction(true);
  }, []);

  return (
    <div className="PlayerPanel-container">
      <NaviBar history={history} />
      <PlayerMenu content={content} history={history} />
      {player && (
        <main>
          {display === "default" && <Status />}

          <aside>{stats[display]}</aside>

          <main>
            <span>{player.name}</span>

            <div className="profile">
              <PanelPortrait image={player.avatar} />

              <main>
                <MainNode
                  current={player.currentLife}
                  total={player.totalLife}
                  life={content.mainNode.life}
                />
                <MainNode
                  current={player.currentEssence}
                  total={player.totalEssence}
                  essence={content.mainNode.essence}
                />
              </main>
            </div>

            <div className="details">
              <StatDisplay
                display={display}
                setDisplay={setDisplay}
                content={content.statDisplay}
              />
            </div>

            <div className="action">
              <MainNode
                current={player.exaustion}
                total={"x"}
                exaustion={content.mainNode.exaustion}
              />

              {action ? <ActionButtonActive /> : <ActionButton />}
              <MainNode
                current={player.inspiration}
                total={"x"}
                inspiration={content.mainNode.inspiration}
              />
            </div>
          </main>

          <aside>{stats[display]}</aside>
        </main>
      )}
      <MembersBar history={history} />
    </div>
  );
}

export default PlayerPanel;
