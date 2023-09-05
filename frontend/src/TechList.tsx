import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

/** Renders list of tech
 * 
 * 
 */
function TechList() {
  return (
    <DropdownButton id="dropdown-item-button" title="Dropdown button">
      <Dropdown.ItemText>Dropdown item text</Dropdown.ItemText>
      <Dropdown.Item as="button">Action</Dropdown.Item>
      <Dropdown.Item as="button">Another action</Dropdown.Item>
      <Dropdown.Item as="button">Something else</Dropdown.Item>
    </DropdownButton>
  );
}

export default TechList;