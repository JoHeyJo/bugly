import React, { useEffect, useState } from 'react'
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
  /** creates dynamic react element */
  const dropdownElement = (item: ITech) => {
    item = item.id !== undefined ? item : { ...item, tech: searchText }
    return item.id !== undefined
      ?
      <Dropdown.Item
        disabled={selectedIds.includes(item.id)}
        onClick={() => {
          updateState(item);
          setSearchText('');
        }}
        data-bs-theme="dark"
        key={item.id}>
        {item.tech}
      </Dropdown.Item>
      :
      <Dropdown.Item
        disabled={selectedIds.includes(item.id)}
        onClick={() => {
          updateState(item);
          setSearchText('');
        }}
        data-bs-theme="dark"
        key={0}>
        {item.id === 0 ? item.tech : "+ create...."}
      </Dropdown.Item>
  }

  const listElements = list.map(item => dropdownElement(item));

  /**Filters list of available tech in dropdown */
  const searchQuery = searchText === "" ? listElements : list.reduce<JSX.Element[]>((items, item) => {
    const isTechAvailable = item.tech.toLowerCase().includes(searchText.toLowerCase())
    if (isTechAvailable) items.push(dropdownElement(item));
    return items;
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
          <Form.Control value={searchText} onChange={handleChange} type="tech" placeholder="search..." />
        </Form.Group>
        {
          (searchQuery.length < 1)
            ?
            dropdownElement({ id: undefined, tech: '+ create....' })
            :
            searchQuery.map((item) => item)
        }
      </DropdownButton>
    </>
  );
}

export default DropMenu;