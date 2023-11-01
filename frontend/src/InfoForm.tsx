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
  form: string;
}

/** Handles dynamic rendering of detail forms and data submission 
 * 
 * props:
 * - handlesClose: closes popOut on submission
 * 
 * state:
 * - info:[{},{},...]
 * - projectId: num
 * 
 * PopOut -> InfoForm -> [DropMenu, InfoInput]
 */

function InfoForm({ handleClose, form }: InfoFormProp) {
  const [info, setNewInfo] = useState(['']);
  const { projectId } = useContext(ProjectContext);

  const { user } = useContext(UserContext);

  /** Creates additional fields to add more info */
  function createDetailField() {
    setNewInfo([...info, ''])
  }

  /** Update info state */
  function updateDetails(index: number, char: string | undefined) {
    setNewInfo(prevDetail => {
      const info = [...prevDetail];
      info[index] = char!
      return info;
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

  /** Submits project info/specs */
  async function submitInfo(e: any) {
    e.preventDefault()
    try {
      await infoPost(projectId, { [form]: info })
    } catch (error: any) {
      errorHandling('submitInfo in InfoForm', error)
    }
  }

  return (
    <>
      <Button className="mx-1 my-2" variant="outline-warning" onClick={createDetailField}>additional {form}</Button>
      <Form onSubmit={submitInfo}>
        <ul id="InfoForm-detail-list">
          {info.map((detail, i) =>
            <li key={i} className="InfoForm-detail py-2"><InfoInput updateState={updateDetails} index={i} form={form} /></li>
          )}
        </ul>
        {renderSubmitButton()}
      </Form>
    </>
  );
}

export default InfoForm;
