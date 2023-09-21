import React, { useState, useContext } from "react";
import Button from 'react-bootstrap/Button';
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserContext } from "../userContext";
import AlertBubble from "../AlertBubble";
import { techProjectDelete } from "../api";
import { errorHandling } from "../utils/errorHandling";
import SubmitButton from "../utils/SubmitButton";

type PillButtonProps = {
  label: string;
  id: number | undefined;
};

/** Not a functioning button. Redesigned UI, delete actions is no longer facilitated through this component. 
 * [TechList] -> PillButton
*/
function PillButton({ label, id }: PillButtonProps) {
  const [isRemoving, setIsRemoving] = useState(false);
  const { user } = useContext(UserContext);

  function handleClick() {
    setIsRemoving(true);
  }

  /**Dissociate tech from project  */
  // function remove() {
  //   try {
  //     await techProjectDelete(projectId, techId)
  //   } catch (error:any) {
  //     errorHandling("PillButton")
  //   }
  // }

  return (
    <>
      {!isRemoving
        ?
        <Button onClick={handleClick} variant="outline-dark" className="PillButton">
          {label}
        </Button>
        :
        <SubmitButton userEmail={user?.email} handleAction={()=>{}} variant={"danger"} action={"removeTech"} />
      }
    </>
  );
}
export default PillButton;
