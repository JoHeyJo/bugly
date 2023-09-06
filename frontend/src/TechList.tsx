import React from "react";

type TechListProp = {
  tech: string[];
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
          <li key={idx}>{t}</li>
        )}
      </ul>
    </>

  );
}

export default TechList;