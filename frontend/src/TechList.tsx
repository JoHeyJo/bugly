import React from "react";
import { ITech } from './interface'

type TechListProp = {
  tech: ITech[];
}

/** Renders list of tech
 * 
 * RenderInfo -> TechList
 */
function TechList({ tech }: TechListProp) {
  return (
    <>
      <ul>
        {tech.map((t, idx) =>
          <li key={idx}>{t.tech}</li>
        )}
      </ul>
    </>

  );
}

export default TechList;