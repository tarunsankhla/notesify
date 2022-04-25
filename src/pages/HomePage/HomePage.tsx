import "./HomePage.css";
import ReactQuill from 'react-quill';
import CreateButton from "../../components/UI/Buttons/CreateButton/CreateButton";
import { useRef, useState } from "react";
import { debounce } from "../../utils/Debounce";

export default function HomePage() {
  const [noteContent, setNoteContent] = useState("");
  const noteRef = useRef("");

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

  const OnUpdateNote = (text:any) => { 
    console.log(text, noteContent);
    var doc = new DOMParser().parseFromString(text, "text/xml");
    console.log(doc.textContent,doc.firstChild?.textContent);
    setNoteContent(text.innerText);
  }
  return (
    <div>
      <div className="note-editor-container">
        <ReactQuill
          theme="snow"
          modules={modules}
          formats={formats}
          placeholder={"Write Something....."}
          value={noteContent}
          onChange={(e) => debounce(() => OnUpdateNote(e), 500)} />  
        <div>
          <div className="color-schema">{ noteContent}</div>
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