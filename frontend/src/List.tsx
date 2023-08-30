import React from "react";

type ListProp = {
  list: string[]
}
/** Handles a list 
 * Info -> List
*/
function List({ list }: ListProp) {
  return (
    <ul>
      {list.map((listItem, i) => <li key={i}>{listItem}</li>)}
    </ul>
  )
}

export default List;