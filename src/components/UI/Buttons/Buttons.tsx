import {BiJournalPlus, BiPatchPlus} from '../Icons/Icons';
import "./Buttons.css";

function FloatAddButton() {
  return (
    <div className='float-add-btn'><BiJournalPlus /></div>
  )
}



function CreateButton(props) {
    return (
      <div className='create-btn'>Create Note <BiPatchPlus/></div>
    )
  }
  
  CreateButton.propTypes = {}
  
export {
    CreateButton,
    FloatAddButton
};
  