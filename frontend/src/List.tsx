import React from "react";
import './style/List.css'

type ListProp = {
  list: string[]
}
/** Handles a list 
 * RenderInfo -> List
*/
function List({ list }: ListProp) {
  return (
    <div className="List-container">
      <ul>
        {list.map((listItem, i) => <li key={i}>{listItem}</li>)}
      </ul>
    </div>
  )
}

export default List;