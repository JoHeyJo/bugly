import React, { useState } from "react";
import Button from 'react-bootstrap/Button';

type PillButtonProps = {
  label: string;
  id: number | undefined;
};

/** Not a functioning button. Redesigned UI, delete actions is no longer facilitated through this component. */
function PillButton({ label, id }: PillButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  function handleClick() {
    setIsDeleting(true);
  }

  return (
    <>
        <Button disabled onClick={handleClick} variant="dark" className="PillButton">
          {label}
        </Button> 
    </>
  );
}
export default PillButton;
