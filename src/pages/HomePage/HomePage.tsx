/* eslint-disable no-lone-blocks */
import "src/pages/HomePage/HomePage.css";
import ReactQuill from 'react-quill';
import { useMemo, useReducer, useRef, useState } from "react";
import { debounce } from "src/utils/Debounce";
import DOMPurify from 'dompurify';
import { FloatAddButton, CreateButton } from "src/components/UI/Buttons/Buttons";
import { BiXCircle } from "src/components/UI/Icons/Icons";
import { FullPageModal } from "src/components/UI/Modal/FullPageModal/FullPageModal";
import { useModal } from "src/context/ModalProvider";

const ContentDetail = (state, action) => {
  switch (action.type) {
    // eslint-disable-next-line no-lone-blocks
    case "htmlbody": {
      return { ...state, htmlbody: action.data }
    };
    case "title": {
      return { ...state, title: action.data }
    };
    case "color": {
      return { ...state, color: action.data }
    };
    default: {
      return { ...state };
    }
  }
}


export default function HomePage() {
  const [showNote, setShowNote] = useState(true);
  const [noteState, noteDispatch] = useReducer(ContentDetail,
    {
      title: "",
      htmlbody: "",
      createdOn: "",
      color: "",
    });
  var modules = useRef({});
  const { modalToggle, setmodalToggle } = useModal();


  useMemo(() => {
    modules.current = {
      toolbar: [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image'],
        ['clean']
      ],
    };
  }, []);

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
//   archives: []
// createdAt: "2022-04-30T19:42:02+05:30"
// email: "adarshbalika@gmail.com"
// firstName: "Adarsh"
// id: "1"
// lastName: "Balika"
// notes: []
// updatedAt: "2022-04-30T19:42:02+05:30"

  return (
    <div className="home-page">
      <div>
        {showNote &&
          // <FullPageModal>
          <div className="note-editor-container">
            <div className="close-note" onClick={() => setShowNote(false)}><BiXCircle /></div>
            <input
              className="note-title-input"
              placeholder="Title note ...."
              onChange={(e) => debounce(() => noteDispatch({ type: "title", data: e.target.value }), 500)} />
            <ReactQuill
              theme="snow"
              modules={modules.current}
              // formats={formats}
              placeholder={"Write Something....."}
              // value={noteState.htmlbody}
              onChange={(e) => debounce(() => noteDispatch({ type: "htmlbody", data: e }), 500)} />
            <div className="note-editor-action">
              <p className="color-schema" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(noteState.htmlbody) }}></p>
              <input
                type="color" className="color-pallete"
                onChange={(e) => debounce(() => noteDispatch({ type: "color", data: e.target.value }), 500)} />
              <span><CreateButton /></span>
            </div>
            </div>
          // </FullPageModal>
        }
      </div>


      <div className="latest-notes-container">
        <div className="page-title">Latest Notes : </div>
        <div></div>
      </div>
      <span onClick={() => { setShowNote(true);  }}>
        <FloatAddButton />
      </span>
    </div>
  )
}
 