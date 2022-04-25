import "./HomePage.css";
import ReactQuill from 'react-quill';
import CreateButton from "../../components/UI/Buttons/CreateButton/CreateButton";

export default function HomePage() {
  var modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  };
 
  var formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];
  return (
    <div>
      <div className="note-editor-container">
        <ReactQuill theme="snow" modules={modules} formats={formats} />  
        <div>
          <div className="color-schema"></div>
          <CreateButton />
        </div>
      </div>
      <div>
        <h1>Latest Notes : </h1>
        <div></div></div>
    </div>
  )
}



// export default HomePage   