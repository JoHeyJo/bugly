import React from "react"
import AlertBubble from "../AlertBubble";
import { Button } from "react-bootstrap";

type SubmitButtonProp = {
  userEmail: string | undefined;
  handleAction: () => void;
  variant: string;
  action: string;
  label: string;
  classType: string | undefined;

}

function SubmitButton({ classType, userEmail, handleAction, variant, action, label }: SubmitButtonProp) {
  return (
    <>
      {userEmail === 'jpf0628@gmail.com'
        ?
        <Button className={classType} type="submit" variant={variant}
          onClick={handleAction}>{label}
        </Button>
        :
        <Button style={{all:"unset"}} variant="none" onClick={(e) => e.stopPropagation()} ><AlertBubble action={action} />
        </Button>
      }
    </>
  )
}

export default SubmitButton; 