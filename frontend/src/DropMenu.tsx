import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './style/DropMenu.css'
import { ITech } from './interface';
/** Dropdown menu 
 */

type DropMenuProp = {
  list: ITech[];
  updateState: (id: number) => void;
  selected: number[];
  submit: () => void;
}



function DropMenu({ list, updateState, selected, submit }: DropMenuProp) {
  return (
    <DropdownButton
      onToggle={submit}
      autoClose="outside"
      className="custom-dropdown py-1"
      id="dropdown-basic-button"
      variant="outline-dark"
      title={<FontAwesomeIcon icon={faPlus} />}>
      {list.map((item) =>
        <Dropdown.Item disabled={selected.includes(item.id)} onClick={() => updateState(item.id)} data-bs-theme="dark" key={item.id}>{item.tech}</Dropdown.Item>
      )}
    </DropdownButton>
  );
}

export default DropMenu;