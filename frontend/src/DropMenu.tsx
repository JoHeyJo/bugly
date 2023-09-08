import React, { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './style/DropMenu.css'
import { ITech } from './interface';
import Form from 'react-bootstrap/Form';
/** Dropdown menu 
 */

type DropMenuProp = {
  list: ITech[];
  updateState: (tech: ITech) => void;
  selected: ITech[];
  submit: () => void;
}



function DropMenu({ list, updateState, selected, submit }: DropMenuProp) {
  const [searchText, setSearchText] = useState<string>("");

  /** updates searchText state */
  function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    e.preventDefault()
    const char = e.target.value;
    setSearchText(char);
  }

  const searchQuery = list.filter(item => item.tech.includes(searchText))

  return (
    <>
      <DropdownButton
        onToggle={submit}
        autoClose="outside"
        className="custom-dropdown py-1"
        id="dropdown-basic-button"
        variant="outline-dark"
        title={<FontAwesomeIcon icon={faPlus} />}>
        <Form.Group className="mb" controlId="exampleForm.ControlInput1">
          <Form.Control onChange={handleChange} type="tech" placeholder="search..." />
        </Form.Group>
        {searchQuery.map((item) =>
          <Dropdown.Item disabled={selected.includes(item)} onClick={() => updateState(item)} data-bs-theme="dark" key={item.id}>{item.tech}</Dropdown.Item>
        )}
      </DropdownButton>
    </>
  );
}

export default DropMenu;