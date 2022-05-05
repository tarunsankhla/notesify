
import { BiJournalPlus, BiPatchPlus } from 'src/components/UI/Icons/Icons';
import "./Buttons.css";

function FloatAddButton() {
  return (
    <div className='float-add-btn'><BiJournalPlus /></div>
  )
}

function CreateButton({ props: name }) {
  return (
    <div className='create-btn'>{name} <BiPatchPlus /></div>
  )
}

CreateButton.propTypes = {}

export {
  CreateButton,
  FloatAddButton
};
