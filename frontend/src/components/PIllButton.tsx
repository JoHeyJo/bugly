import React from "react";

type PillButtonProp = {
  label: string;
};

function PillButton({ label }: PillButtonProp) {

  return (
    <div className="PillButton">
      {label}
      <button className="PillButton-remove">x</button>
    </div>
  );
}

export default PillButton;
