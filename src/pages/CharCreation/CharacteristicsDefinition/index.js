import React, { useState } from "react";
import api from "../../../services/api";
import NaviBar from "../../../components/NaviBar";
import CharCreationBar from "../../../components/CharCreationBar";
import InfoBoxLong from "../../../components/InfoBoxLong";

import { useLanguage } from "../../../contexts/language";
import "./styles.css";

function CharacteristicsDefinition({ history }) {
  const { content } = require(`./content/${useLanguage().language}`);
  const [selected, setSelected] = useState({
    personality: JSON.parse(localStorage.getItem("character")).personality,
    occupation: JSON.parse(localStorage.getItem("character")).occupation,
    goal: JSON.parse(localStorage.getItem("character")).goal,
    flaw: JSON.parse(localStorage.getItem("character")).flaw,
  });

  const characteristics = Object.entries(content.characteristics).map((characteristic) => {
    return { ...characteristic };
  });

  async function NextClick(title, GM, level) {
    return await api.put("char-creation", {
      title,
      GM,
      personality: selected.personality,
      occupation: selected.occupation,
      goal: selected.goal,
      flaw: selected.flaw,
      level,
    });
  }

  return (
    <div className="characteristicsDefinition-container">
      <NaviBar history={history} />
      <CharCreationBar
        ready={
          selected.personality && selected.occupation && selected.goal && selected.flaw
            ? true
            : false
        }
        next={NextClick}
        history={history}
      />

      <main>
        <span>{content.title}</span>
        <section>
          {characteristics.map((characteristic) => (
            <div key={characteristic[1].title}>
              <label>{characteristic[1].title}</label>
              <textarea
                placeholder={characteristic[1].placeholder}
                onChange={(e) => setSelected({ ...selected, [characteristic[0]]: e.target.value })}
                value={selected[characteristic[0]]}
              ></textarea>
            </div>
          ))}
        </section>
      </main>

      <InfoBoxLong
        content={[
          {
            title: content.infoBoxLong.title,
            texts: content.infoBoxLong.texts,
          },
        ]}
      />
    </div>
  );
}

export default CharacteristicsDefinition;
