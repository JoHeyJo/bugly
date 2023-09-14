import React from "react"
import AlertBubble from "../AlertBubble";
import { Button } from "react-bootstrap";

type SubmitButtonProp = {
  userEmail: string | undefined;
  handleClose: () => void;
  variant: string;
  action: string;
}

function SubmitButton({ userEmail, handleClose, variant, action }: SubmitButtonProp) {

  return (
    <div>
      {userEmail === 'jpf0628@gmail.com'
        ?
        <Button type="submit" variant={variant}
          onClick={handleClose}>Submit
        </Button>
        :
        <Button variant="none" onClick={(e) => e.stopPropagation()} ><AlertBubble action={action} />
        </Button>
      }
    </div>
  )
}

export default SubmitButton;