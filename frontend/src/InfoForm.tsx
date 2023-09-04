import React, { useContext, useState } from "react";
import InfoInput from "./InfoInput";
import { postInfo } from "./api";
import Form from 'react-bootstrap/Form';
import { errorHandling } from "./utils/errorHandling";
import { Button } from "react-bootstrap";
import { ProjectContext } from './userContext';
import ProjectForm from './ProjectForm';
import { UserContext } from './userContext';
import AlertBubble from "./AlertBubble";

type InfoFormProp = {
  handleClose: () => void | undefined;
  // projectId: number | undefined;
}

/** Handles dynamic rendering of detail forms and data submission 
 * PopOut -> InfoForm
 */

function InfoForm({ handleClose }: InfoFormProp) {
  const [details, setNewDetail] = useState(['']);
  const { projectId } = useContext(ProjectContext);
  const { user } = useContext(UserContext);

  /** Creates additional fields to add more details */
  function createDetailField() {
    setNewDetail([...details, ''])
  }

  /** Update details state */
  function updateDetails(index: number, char: string | undefined) {
    setNewDetail(prevDetail => {
      const details = [...prevDetail];
      details[index] = char!
      return details;
    })
  }

  /** Adjusts submit button label if post exists. Disables button and renders
 *  overlay if there is no logged in user  */
  function renderSubmitButton() {
    return <div className="">
      {user?.email === 'jpf0628@gmail.com'
        ? <Button type="submit" variant="primary" onClick={handleClose}>Submit</Button>
        : <AlertBubble action={"addDetails"} />
      }
    </div>
  }

  /** Submits project details */
  async function submitDetails(e: any) {
    e.preventDefault()
    try {
      await postInfo(projectId, details)
    } catch (error: any) {
      errorHandling('submitDetails in InfoForm', error)
    }
  }

  return (
    <>
      <Button className="mx-1 my-2" variant="outline-warning" onClick={createDetailField}>additional detail</Button>
      <Form onSubmit={submitDetails}>
        <ul>
          {details.map((detail, i) =>
            <li key={i}><InfoInput updateState={updateDetails} index={i} /></li>
          )}
        </ul>
        {renderSubmitButton()}
      </Form>
    </>
  );
}

export default InfoForm;