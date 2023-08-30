import React, { useState } from "react";
import Form from 'react-bootstrap/Form';

/** Handles individual detail input state while allowing more "detail" to be created
 * InfoForm -> InfoInput
 */
function InfoInput() {
  const [detailData, setDetailData] = useState<string>('')

  /** Handles details data */
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const detail = e.target.value;
    setDetailData(detail)
  }
  return (
    <Form.Control
      value={detailData}
      name="detail"
      type="text"
      placeholder="Add detail..." 
      onChange={handleChange}
      />
  )
}

export default InfoInput;

