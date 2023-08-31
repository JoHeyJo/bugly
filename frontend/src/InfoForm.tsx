import React, { useState } from "react";
import InfoInput from "./InfoInput";
import { postInfo } from "./api";
import Form from 'react-bootstrap/Form';
import { errorHandling } from "./utils/errorHandling";

type InfoFormProp = {
  projectId: number | undefined;
}

/** Handles dynamic rendering of detail forms and data submission 
 * PopOut -> InfoForm
 */

function InfoForm({ projectId }: InfoFormProp) {
  const [details, setNewDetail] = useState(['']);

  /** Creates additional fields to add more details */
  function createDetailField() {
    setNewDetail([...details, ''])
  }
  
  /** Update details state */
  function updateDetails(index:number, char: string | undefined){
    setNewDetail(prevDetail => {
      const detail = [...prevDetail];
      detail[index] = char!
      return detail;
    })
  }
       
/** Submits project details */
async function submitDetails(){

  try {
    // const res = await postInfo(projectId, details)
  } catch (error:any) {
    errorHandling('submitDetails in InfoForm', error)
  }
}

  return (
    <>
      <button onClick={createDetailField}>create new detail</button>
      <Form onSubmit={submitDetails}>
        {details.map((detail, i) => <ul>
          <li key={i}><InfoInput updateState={updateDetails} index={i} /></li>
        </ul>
        )}
      </Form>
    </>
  );
}

export default InfoForm;