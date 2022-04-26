import "./HomePage.css";
import ReactQuill from 'react-quill';
import CreateButton from "../../components/UI/Buttons/CreateButton/CreateButton";
import { useReducer, useRef, useState } from "react";
import { debounce } from "../../utils/Debounce";
import DOMPurify from 'dompurify';
import FloatAddButton from "../../components/UI/Buttons/FloatAddButton/FloatAddButton";
import BiXCircle from "../../components/UI/Icons/BiXCircle";

const ContentDetail = (state, action) => { 
  console.log(state);
  console.log(action, action.data); 
  if (action.type === "htmlbody") { 
    return { ...state ,htmlbody :  action.data}
  }
  if (action.type === "title") { 
    return { ...state ,title : action.data}
  }
  if (action.type === "color") { 
    return { ...state ,color : action.data}
  }
  return { ...state };
}


export default function HomePage() {
  const [showNote, setShowNote] = useState(true);
  const noteRef = useRef("");
  const [noteState, noteDispatch] = useReducer(ContentDetail,
    {
      title: "",
      htmlbody: "",
      createdOn: "",
      color :"",
    });

  
 
  var modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
     ],
  };
 
  // var formats = [
  //   'header',
  //   'bold', 'italic', 'underline', 'strike', 'blockquote',
  //   'list', 'bullet', 'indent', 
  //   'link', 'image'
  // ];

  // const OnUpdateNote = (text:any) => { 
  //   console.log(text, noteContent);
  //   // var doc = new DOMParser().parseFromString(text, "text/xml");
  //   // console.log(doc.textContent,doc.firstChild?.textContent);
  //   setNoteContent(text);
  //   noteDispatch({ type: "htmlbody", text });
  // }

  return (
    <div className="home-page">
      <div>
        {showNote &&
          <div className="note-editor-container">
            <div className="close-note" onClick={()=>setShowNote(false)}><BiXCircle /></div>
          <input 
            className="note-title-input"
            placeholder="Title note ...."
            onChange={(e) => debounce(() => noteDispatch({ type: "title", data: e.target.value }), 500)} />
          <ReactQuill
            theme="snow"
            modules={modules}
            // formats={formats}
            placeholder={"Write Something....."}
            // value={noteState.htmlbody}
            onChange={(e) => debounce(() => noteDispatch({ type: "htmlbody", data : e }), 500)} />  
          <div className="note-editor-action">
              <p className="color-schema" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(noteState.htmlbody) }}></p>
              <input
                type="color" className="color-pallete"
                onChange={(e) => debounce(() => noteDispatch({ type: "color", data: e.target.value }), 500)}/>
            <span><CreateButton /></span>
          </div>
          </div>
        }
      </div>
      
     
      <div className="latest-notes-container">
        <h1>Latest Notes : </h1>
        <div></div>
      </div>
      <span onClick={()=> setShowNote(true)}>
        <FloatAddButton />
      </span>
    </div>
  )
}



// export default HomePage   