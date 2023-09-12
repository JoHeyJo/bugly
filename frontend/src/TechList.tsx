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
      <ul className="d-flex">
        {tech.map((t, idx) =>
          <li className="px-3" key={idx}>{t.tech}</li>
        )}
      </ul>
    </>

  );
}

export default TechList;