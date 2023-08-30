import React, { useState } from "react";
import InfoInput from "./InfoInput";
/** Handles dynamic rendering of detail forms and data submission 
 * PopOut -> InfoForm
 */
function InfoForm() {
  const [details, setNewDetail] = useState([<InfoInput/>]);
  
  /** Creates additional fields to add more details */
  function createDetailField(){
    setNewDetail([...details, <InfoInput/>])
  }
  return (
    <>
    <button onClick={createDetailField}>create new detail</button>
      {details.map(detail => detail)}
    </>
  );
}

export default InfoForm;