import React from "react";
import './style/List.css'

type ListProp = {
  list: string[]
}
/** Handles a list 
 * RenderInfo -> List
*/
function DetailsList({ list }: ListProp) {
  return (
    <div className="List-container">
      <ul>
        {list.map((listItem, i) => <li className="DetailList-item" key={i}>{listItem}</li>)}
      </ul>
    </div>
  )
}

export default DetailsList;