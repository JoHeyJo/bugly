import React, { useState, useContext } from "react";
import Button from 'react-bootstrap/Button';
import { UserContext } from "../userContext";
import SubmitButton from "../utils/SubmitButton";

type PillButtonProps = {
  label: string;
  id: number | undefined;
  handleAction: (techId: number | undefined) => Promise<void>;
};

/**  Renders PillButton with tech info or renders button to remove tech from list 
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
