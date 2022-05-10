
import { BiJournalPlus, BiPatchPlus } from 'src/components/UI/Icons/Icons';
import "./Buttons.css";

function FloatAddButton() {
  return (
    <button className='float-add-btn'><BiJournalPlus /></button>
  )
}

function CreateButton({ props: name }) {
  return (
    <button className='create-btn'>{name} <BiPatchPlus /></button>
  )
}

CreateButton.propTypes = {}

export {
  CreateButton,
  FloatAddButton
};
