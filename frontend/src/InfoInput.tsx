import { useState } from "react";
import Form from 'react-bootstrap/Form';


type InfoInputProp = {
  updateState: (index:number, char:string) => void;
  index: number;
  form: string;
}
/** Handles individual detail input state while allowing more "detail" to be created
 * InfoForm -> InfoInput
 */
function InfoInput({ updateState, index, form }: InfoInputProp) {
  const [detailData, setDetailData] = useState<string>('')


  /** Handles details data */
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const detail = e.target.value;
    setDetailData(detail)
    updateState(index, detail)
  }

  return (
    <Form.Control
      value={detailData}
      name="detail"
      type="text"
      placeholder={`Add ${[form]}...`}
      onChange={handleChange}
    />
  )
}

export default InfoInput;

