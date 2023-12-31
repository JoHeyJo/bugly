import React, { useState, useContext } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './style/DropMenu.css'
import { ITech } from './interface';
import Form from 'react-bootstrap/Form';
import SubmitButton from './utils/SubmitButton';
import { ProjectContext, UserContext } from './userContext';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AlertBubble from "./AlertBubble";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from 'react-bootstrap';
import { errorHandling } from './utils/errorHandling';
import { techDelete } from './api';
import AlertPopUp from './AlertPopUp';

type DropMenuProp = {
  list: ITech[];
  updateState: (tech: ITech) => void;
  selected: ITech[];
  submit: () => void;
}


/** Dropdown menu renders list of available technologies to choose from with 
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
      <div className='d-flex'>
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
        {user?.email === "jpf0628@gmail.com"
          ?
          <Button onClick={() => deleteTech(item.id)} variant='outline-dark'>
            <FontAwesomeIcon icon={faXmark} />
          </Button>
          :
          <Button variant="none">
            <AlertBubble action={"deleteTech"} icon={<FontAwesomeIcon icon={faXmark} />}/>
          </Button>
        }
      </div>
      :
      <Dropdown.Item
        disabled={selectedIds.includes(item.id)}
        onClick={(e) => {
          updateState(item);
          setSearchText('');
          e.stopPropagation();
        }}
        data-bs-theme="dark"
        key={list.length}>
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

  /**Deletes tech from db so it can no longer be selected */
  async function deleteTech(techId: number | undefined) {
    try {
      await techDelete(techId)
    } catch (error: any) {

      errorHandling("DropMenu -> deleteTech", error)
    }
  }

  return (
    <>
      <Dropdown data-bs-theme="dark" autoClose="outside" onToggle={handleDropdownToggle}>
        {isOpen
          ?
          <SubmitButton classType={undefined} userEmail={user?.email} handleAction={submitIfOpen} variant={"none"} action={"addTech"} label={"Submit"}/>
          :
          <Dropdown.Toggle variant='none'>
            <FontAwesomeIcon icon={faPlus} />
          </Dropdown.Toggle>
        }
        <Dropdown.Menu variant="dark px-1">
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
      </Dropdown>
    </>
  );
}

export default DropMenu;