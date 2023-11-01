import React from "react";
import "./style/SpecList.css";

type SpecListProp = {
  list: string[];
}

/** Renders a list of project specs
 * 
 * RenderInfo -> SpecList
 */
function SpecList({ list }: SpecListProp) {
  return (
    <div id="SpecList-container">
      <h3>Coming soon...</h3>
    </div>
  )
}

export default SpecList;