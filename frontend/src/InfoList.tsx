import './style/List.css';
import './style/InfoList.css';

type ListProp = {
  list: string[]
}
/** Handles a generic list of items
 * RenderInfo -> InfoList
*/
function InfoList({ list }: ListProp) {
  return (
    <div className="List-container">
      <ul style={{ paddingLeft: "1px" }}>
        {list.map((listItem, i) => <li className="DetailList-item" key={i}>{listItem}</li>)}
      </ul>
    </div>
  )
}

export default InfoList;