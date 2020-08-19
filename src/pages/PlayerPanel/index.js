import React, { useState, useEffect } from "react";
import { useAuth } from "~/contexts/auth";

import DiamondButton from "~/components/atoms/DiamondButton";
import NaviBar from "~/components/organisms/NaviBar";
import MembersBar from "~/components/organisms/MembersBar";
import StatDisplay from "~/components/organisms/StatDisplay";
import StatSection from "~/components/organisms/StatSection";
import PanelPortrait from "~/components/organisms/PanelPortrait";

import ActionButtonActive from "./components/Actions/ActionButtonActive";
import PlayerMenu from "./components/PlayerMenu";
import ActionButton from "./components/Actions/ActionButton";
import Status from "./components/Status";

import { useLanguage } from "~/contexts/language";
import "./styles.css";

function PlayerPanel({ history }) {
  const { content } = require(`./content/${useLanguage().language}`);
  const [display, setDisplay] = useState("");
  const [boxDisplay, setBoxDisplay] = useState("");
  const [action, setAction] = useState(false);
  const [player, setPlayer] = useState();

  const { signedApiCall } = useAuth();

  // function firstHalf(array) {
  //   return array.filter((value, index) => index < array.length / 2);
  // }

  // function secondHalf(array) {
  //   return array.filter((value, index) => index >= array.length / 2);
  // }

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
          {display === "" && <Status />}

          {display !== "" && (
            <aside>
              <StatSection player={player} content={Object.values(content.statSection.combat)} />
            </aside>
          )}

          <main>
            <span>{player.name}</span>

            <div className="profile">
              <PanelPortrait image={player.avatar} />
            </div>

            <div className="details">
              <StatDisplay
                display={display}
                setDisplay={setDisplay}
                content={content.statDisplay}
              />
            </div>

            <div className="action">
              <div>
                <DiamondButton
                  stat={"exaustion"}
                  value={player.exaustion}
                  name={content.mainNode.exaustion}
                  setBoxDisplay={setBoxDisplay}
                />
              </div>

              {action ? <ActionButtonActive /> : <ActionButton />}

              <div>
                <DiamondButton
                  stat={"inspiration"}
                  value={player.exaustion}
                  name={content.mainNode.exaustion}
                  setBoxDisplay={setBoxDisplay}
                />
              </div>
            </div>
          </main>

          {display !== "" && (
            <aside>
              {/* <StatSection player={player} content={Object.values(content.statSection.combat)} /> */}
            </aside>
          )}
        </main>
      )}
      <MembersBar history={history} />
    </div>
  );
}

export default PlayerPanel;
