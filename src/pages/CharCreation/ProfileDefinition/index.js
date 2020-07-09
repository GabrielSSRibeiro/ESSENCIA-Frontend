import React, { useState, useMemo } from "react";
import api from "../../../services/api";
import NaviBar from "../../../components/NaviBar";
import CharCreationBar from "../../../components/CharCreationBar";

import { useLanguage } from "../../../contexts/language";
import "./styles.css";

function ProfileDefinition({ history }) {
  const { content } = require(`./content/${useLanguage().language}`);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null);

  const allowedFiles = ["jpeg", "jpg", "png"];

  async function NextClick(user, title, GM, level) {
    const data = new FormData();
    data.append("user", user);
    data.append("title", title);
    data.append("GM", GM);
    data.append("level", 1);
    data.append("name", name);
    data.append("avatar", avatar);

    return await api.put("char-creation", data);
  }

  const preview = useMemo(() => {
    return avatar ? URL.createObjectURL(avatar) : null;
  }, [avatar]);

  return (
    <div className="profileDefinition-container">
      <NaviBar history={history} />
      <CharCreationBar ready={name && avatar ? true : false} next={NextClick} history={history} />

      <main>
        <span>{content.title}</span>
        <label>{content.name}</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <label
          className="avatar"
          style={{ backgroundImage: `url(${preview})`, backgroundSize: "100%" }}
        >
          <input type="file" onChange={(e) => setAvatar(e.target.files[0])} />
          {!avatar ? (
            <label>{content.upload}</label>
          ) : (
            !allowedFiles.includes(avatar.name.split(".")[1].toLowerCase()) && (
              <label>{content.wrong}</label>
            )
          )}
        </label>
      </main>
    </div>
  );
}

export default ProfileDefinition;
