import React, { useState } from "react";
import { useAuth } from "~/contexts/auth";
import NaviBar from "~/components/organisms/NaviBar";
import CharCreationBar from "~/components/organisms/CharCreationBar";
import CharCreationOutline from "~/components/organisms/CharCreationOutline";
import InfoBoxLong from "~/components/organisms/InfoBoxLong";

import { useLanguage } from "~/contexts/language";
import "./styles.css";

function PastDefinition({ history }) {
  const { content } = require(`./content/${useLanguage().language}`);
  const [past, setPast] = useState(JSON.parse(localStorage.getItem("character")).past);

  const { signedApiCall } = useAuth();

  async function NextClick(title, GM, level) {
    return await signedApiCall("put", "char-creation", {
      title,
      GM,
      past,
      level,
    });
  }

  return (
    <div className="pastDefinition-container">
      <NaviBar history={history} />
      <CharCreationBar ready={past ? true : false} next={NextClick} history={history} />

      <main>
        <CharCreationOutline content={content} />
        <span>{content.title}</span>

        <textarea
          placeholder={content.placeholder}
          onChange={(e) => setPast(e.target.value)}
          value={past}
        ></textarea>
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

export default PastDefinition;
