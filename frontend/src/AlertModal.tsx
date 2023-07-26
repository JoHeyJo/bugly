import { useState, useContext} from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import "./style/AlertModal.css";
import { projectDelete } from './api';
import { UserContextType, UserContext } from './userContext';
import AlertBubble from './AlertBubble';

type ProjectData = {
  name?: string;
  id?: number;
}

type AlertModalProps = {
  projectData: ProjectData;
  projectGet: () => void;
  isOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
/** show alerts for Project. (refactor to be an edit modal)
 * 
 * 
 *  Projects -> AlertModal
 */
function AlertModal({ projectData, projectGet, isOpen }: AlertModalProps) {
  const [show, setShow] = useState(false);
  const { user } = useContext(UserContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /**Deletes project and associated posts */
  async function deleteProject() {
    try {
      const res = await projectDelete(projectData.id,)
      projectGet();
      isOpen(false);
    } catch (error: any) {
      console.error(`Error in deleteProject =>${error}`)
    }
  }

  return (
    <>
      <button className="btn btn-custom" onClick={handleShow}>
        <FontAwesomeIcon icon={faPenToSquare} className="font-icon" />
      </button>

      <Modal className="custom-modal" show={show} onHide={handleClose}>
        <Modal.Header className="custom-modal-header" closeButton>
          <Modal.Title>{`Delete ${projectData.name}`}</Modal.Title>
        </Modal.Header >
        <Modal.Body className="custom-modal-body">...this will delete all associated posts as well.</Modal.Body>
        <Modal.Footer className="custom-modal-footer">
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          {user?.email === 'j@test.com'
            ? <Button variant="outline-danger" onClick={() => {
              deleteProject();
              handleClose();
            }}>
              Delete
            </Button>
            : <AlertBubble action={'deleteProject'} />
          }


        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AlertModal;