import React, { useState, useEffect } from "react";
import api from "../../../../../services/api";

import "./styles.css";
import deleteIcon from "../../../../../assets/edition/delete.png";

function ManageParty(props) {
  const [partyMembers, setPartyMembers] = useState([]);

  async function RemovePlayer(user) {
    const playerUser = user;
    const title = localStorage.getItem("game");
    const response = await api.delete("player-games", { params: { title, playerUser } });

    setPartyMembers(response.data.party);
  }

  async function NewPlayerClick() {
    props.history.push("/gm-new-player");
  }

  useEffect(() => {
    async function LoadPartyMembers() {
      const GM = localStorage.getItem("GM");
      const title = localStorage.getItem("game");
      const response = await api.get("gm-panel", { params: { GM, title } });

      setPartyMembers(response.data.party);
    }

    LoadPartyMembers();
  }, []);

  return (
    <>
      <div className="row manageParty-area align-items-center justify-content-center">
        {partyMembers.map(member => (
          <React.Fragment key={member._id}>
            <div className="col-auto manageParty-member">
              <img
                className="manageParty-delete-img"
                src={deleteIcon}
                onClick={() => RemovePlayer(member.user)}
                alt="Delete"
              />
              <div className="manageParty-avatar">
                <label htmlFor="userAvatar" className="manageParty-avatar-label">
                  {member.user}
                </label>
              </div>
              <button className="sl-button manageParty-btn">Gerenciar</button>
            </div>
          </React.Fragment>
        ))}
        <div className="col-auto" style={{ display: partyMembers.length < 5 ? "" : "none" }}>
          <button className="sl-button" onClick={NewPlayerClick}>
            Adicionar
          </button>
        </div>
      </div>

      {/* notes */}
      <label className="manageParty-notes-label" htmlFor="generalNotes">
        Notas Gerais
      </label>
      <textarea className="manageParty-general-notes" placeholder="Notas da campanha..."></textarea>
    </>
  );
}

export default ManageParty;
