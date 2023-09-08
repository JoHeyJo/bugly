import React, { useState } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './style/DropMenu.css'
import { ITech } from './interface';
import Form from 'react-bootstrap/Form';
import { isTemplateSpan } from 'typescript';
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
  const [isOpen, setIsOpen] = useState(false);

  /** updates searchText state */
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    const char = e.target.value;
    setSearchText(char);
  }


  /** updates state when dropdown is open/close */
  const handleDropdownToggle = (nextOpenState: any) => {
    setIsOpen(nextOpenState);
  };

  /** allows Dropdown button to serve a dual purpose by submitting data only when dropdown is open */
  function submitIfOpen() {
    if (isOpen) submit();
  }

  const selectedIds = selected.map(item => item.id)

  const searchQuery = list.reduce<ITech[]>((items, item) => {
    const isTechAvailable = item.tech.toLowerCase().includes(searchText.toLowerCase())
    if (isTechAvailable) items.push(item)
    if (items.length < 1 && !isTechAvailable) items.push({ id: undefined, tech: '+ create....' });
    return items
  }, [])

  return (
    <>
      <DropdownButton
        onToggle={handleDropdownToggle}
        show={isOpen}
        onClick={submitIfOpen}
        autoClose="outside"
        className="custom-dropdown py-1"
        id="dropdown-basic-button"
        variant="outline-dark"
        title={<FontAwesomeIcon icon={faPlus} />}>
        <Form.Group className="mb" controlId="exampleForm.ControlInput1">
          <Form.Control onChange={handleChange} type="tech" placeholder="search..." />
        </Form.Group>
        {searchQuery.map((item) =>
          <Dropdown.Item disabled={selectedIds.includes(item.id)} onClick={() => updateState(item)} data-bs-theme="dark" key={item.id || 0}>{item.tech}</Dropdown.Item>
        )}
      </DropdownButton>
    </>
  );
}

export default DropMenu;