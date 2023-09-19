import React from "react";
import { ITech } from './interface'
import './style/TechList.css';
import PillButton from "./components/PIllButton";

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
      <ul id="TechList-list" className="d-flex">
        {tech.map((t, idx) =>
        <>
          <li className="px-3" key={idx}><PillButton label={t.tech} id={t.id}/></li>
        </>
        )}
      </ul>
    </>

  );
}

export default TechList;