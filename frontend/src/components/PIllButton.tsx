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
  handleAction: (techId: number | undefined) => Promise<void>;
};

/** Not a functioning button. Redesigned UI, delete actions is no longer facilitated through this component. 
 * [TechList] -> PillButton
*/
function PillButton({ label, id, handleAction }: PillButtonProps) {
  const [isRemoving, setIsRemoving] = useState(false);
  const { user } = useContext(UserContext);

  function handleClick() {
    setIsRemoving(!isRemoving);
    setTimeout(()=>{
      setIsRemoving(false)
    },3000)
  }

  /** Removes tech association from project */
  function remove(){
    handleAction(id);
  }

  return (
    <>
      {!isRemoving
        ?
        <Button onClick={handleClick} variant="outline-dark" className="PillButton">
          {label}
        </Button>
        :
        <SubmitButton userEmail={user?.email} handleAction={remove} variant={"danger"} action={"removeTech"} label={"remove"} />
      }
    </>
  );
}
export default PillButton;
