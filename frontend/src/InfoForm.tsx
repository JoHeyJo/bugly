import React, { useContext, useState } from "react";
import InfoInput from "./InfoInput";
import { infoPost } from "./api";
import Form from 'react-bootstrap/Form';
import { errorHandling } from "./utils/errorHandling";
import { Button } from "react-bootstrap";
import { ProjectContext } from './userContext';
import { UserContext } from './userContext';
import AlertBubble from "./AlertBubble";
import './style/InfoForm.css';

type InfoFormProp = {
  handleClose: () => void | undefined;
  // projectId: number | undefined;
}

/** Handles dynamic rendering of detail forms and data submission 
 * 
 * props:
 * - handlesClose: closes popOut on submission
 * 
 * state:
 * - details:[{},{},...]
 * - projectId: num
 * 
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
    return <div>
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
      await infoPost(projectId, {"details":details})
    } catch (error: any) { 
      errorHandling('submitDetails in InfoForm', error)
    }
  }

  return (
    <>
      <Button className="mx-1 my-2" variant="outline-warning" onClick={createDetailField}>additional detail</Button>
      <Form onSubmit={submitDetails}>
        <ul id="InfoForm-detail-list">
          {details.map((detail, i) =>
            <li key={i} className="InfoForm-detail py-2"><InfoInput updateState={updateDetails} index={i} /></li>
          )}
        </ul>
        {renderSubmitButton()}
      </Form>
    </>
  );
}

export default InfoForm;