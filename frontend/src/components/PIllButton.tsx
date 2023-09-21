import React, { useState, useContext } from "react";
import Button from 'react-bootstrap/Button';
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserContext } from "../userContext";

type PillButtonProps = {
  label: string;
  id: number | undefined;
};

/** Not a functioning button. Redesigned UI, delete actions is no longer facilitated through this component. */
function PillButton({ label, id }: PillButtonProps) {
  const [isRemoving, setIsRemoving] = useState(false);
  const { user } = useContext(UserContext);

  function handleClick() {
    setIsRemoving(true);
  }

  /**Dissociate tech from project  */
  function remove() {

  }

  /**Disables/ enables removed action for logged in user*/
  function toggleRemoveButton() {
    return user?.email === "jpf0628@gmail.com"
      ?
      <Button onClick={() => deleteTech(item.id)} variant='outline-dark'>
        <FontAwesomeIcon icon={faXmark} />
      </Button>
      :
      <Button variant="none">
        <AlertBubble action={"deleteTech"} icon={<FontAwesomeIcon icon={faXmark} />} />
      </Button>
  }

  return (
    <>
      {!isRemoving
        ?
        <Button onClick={handleClick} variant="outline-dark" className="PillButton">
          {label}
        </Button>
        :
        <Button className="PillButton" type="submit" variant="warning"
          onClick={remove}>Remove
        </Button>
      }
    </>
  );
}
export default PillButton;
