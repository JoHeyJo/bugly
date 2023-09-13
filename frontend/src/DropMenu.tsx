import React, { useState, useContext } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './style/DropMenu.css'
import { ITech } from './interface';
import Form from 'react-bootstrap/Form';
import SubmitButton from './utils/SubmitButton';
import { UserContext } from './userContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

type DropMenuProp = {
  list: ITech[];
  updateState: (tech: ITech) => void;
  selected: ITech[];
  submit: () => void;
}


/** Dropdown menu renders list of available technoloties to choose from with 
 * the option to create new ones.
 * InfoForm -> DropMenu
*/
function DropMenu({ list, updateState, selected, submit }: DropMenuProp) {
  const [searchText, setSearchText] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useContext(UserContext);

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
    console.log('firing button')
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
        onClick={(e) => {
          updateState(item);
          setSearchText('');
          e.stopPropagation();
        }}
        data-bs-theme="dark"
        key={item.id}>
        {item.tech}
      </Dropdown.Item>
      :
      <Dropdown.Item
        disabled={selectedIds.includes(item.id)}
        onClick={(e) => {
          updateState(item);
          setSearchText('');
          e.stopPropagation();
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
      {/* <div style={{position:"relative", zIndex:"1"}}>
      <DropdownButton
        style={{ position: "relative", zIndex: "1" }}
        disabled={isOpen}
        onToggle={handleDropdownToggle}
        show={isOpen}
        autoClose="inside"
        className="custom-dropdown py-1"
        id="dropdown-basic-button"
        variant="outline-dark"
        // title={<FontAwesomeIcon icon={faPlus} />}>
        // title={isOpen ? <SubmitButton userEmail={user?.email} handleClose={submitIfOpen} variant={"warning"} action={"addTech"} /> : <FontAwesomeIcon icon={faPlus} />}>
          title={isOpen ? <div style={{ position: "relative", zIndex: "9999" }}><SubmitButton userEmail={user?.email} handleClose={submitIfOpen} variant={"warning"} action={"addTech"} /> </div> : <FontAwesomeIcon icon={faPlus} />}>
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
      </div> */}
      <Dropdown autoClose={false} onToggle={handleDropdownToggle}>
        {isOpen
          ?
          // <Dropdown.Toggle className="custom-dropdown">
            <SubmitButton userEmail={user?.email} handleClose={submitIfOpen} variant={"warning"} action={"addTech"} />
          // </Dropdown.Toggle>
          :
          <Dropdown.Toggle className="custom-dropdown" variant="outline-dark">
            <FontAwesomeIcon icon={faPlus} />
          </Dropdown.Toggle>
        }
        {/* <Dropdown.Toggle className="custom-dropdown"> */}
          <SubmitButton userEmail={user?.email} handleClose={submitIfOpen} variant={"warning"} action={"addTech"} />
        {/* </Dropdown.Toggle> */}
        
        <Dropdown.Menu variant="outline-dark">
          <Form.Group className="mb">
            <Form.Control value={searchText} onChange={handleChange} type="tech" placeholder="search..." />
          </Form.Group>
          {
            (searchQuery.length < 1)
              ?
              dropdownElement({ id: undefined, tech: '+ create....' })
              :
              searchQuery.map((item) => item)
          }
        </Dropdown.Menu>
      </Dropdown>{' '}
    </>
  );
}

export default DropMenu;