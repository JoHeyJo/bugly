import React, { useContext, useState } from "react";
import InfoInput from "./InfoInput";
import { postInfo } from "./api";
import Form from 'react-bootstrap/Form';
import { errorHandling } from "./utils/errorHandling";
import { Button } from "react-bootstrap";
import { ProjectContext } from './userContext';
import ProjectForm from './ProjectForm';
import { UserContext } from './userContext';

type InfoFormProp = {
  projectId: number | undefined;
}

/** Handles dynamic rendering of detail forms and data submission 
 * PopOut -> InfoForm
 */

function InfoForm() {
  const [details, setNewDetail] = useState(['']);
  const { projectId } = useContext(ProjectContext);
  console.log('project id ', projectId)

  /** Creates additional fields to add more details */
  function createDetailField() {
    setNewDetail([...details, ''])
  }
  
  /** Update details state */
  function updateDetails(index:number, char: string | undefined){
    setNewDetail(prevDetail => {
      const details = [...prevDetail];
      details[index] = char!
      return details;
    })
  }
       
/** Submits project details */
async function submitDetails(e:any){
  e.preventDefault()
  try {
    await postInfo(projectId, details)
    console.log('submitting details')
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
        <Button type="submit">Add</Button>
      </Form>
    </>
  );
}

export default InfoForm;