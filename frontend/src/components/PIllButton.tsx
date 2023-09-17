import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import SubmitButton from "../utils/SubmitButton";
type PillButtonProps = {
  label: string;
  id: number |undefined;
};

function PillButton({ label, id }: PillButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  function handleClick() {
    setIsDeleting(true);
  }

  return (
    <>
      {isDeleting
        ?
        <Button variant="danger" className="PillButton">delete?</Button>
        :
        <Button onClick={handleClick} variant="outline-warning" className="PillButton">
          {label}
        </Button>
      }
    </>
  );
}

export default PillButton;
