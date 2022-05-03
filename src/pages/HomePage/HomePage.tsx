/* eslint-disable no-lone-blocks */
import "src/pages/HomePage/HomePage.css";
import ReactQuill from "react-quill";
import React, { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { debounce } from "src/utils/Debounce";
import DOMPurify from "dompurify";
import {
	FloatAddButton,
	CreateButton,
} from "src/components/UI/Buttons/Buttons";
import {
	BiCheck,
	BiXCircle,
} from "src/components/UI/Icons/Icons";
import { useModal } from "src/context/ModalProvider";
import useAxios from "src/customhook/useAxios";
import { VAR_ENCODE_TOKEN, VAR_NotPinnedNotes } from "src/utils/Route";
import StopPropogation from "src/utils/StopPropogation";
import { preperation } from "src/assets/holders/holders";
import { useNotes } from "src/context/NotesContext";

const AllNotes = React.lazy(() => import("./AllNotes/AllNotes"));

const ContentDetail = (state, action) => {
	console.log(state, action);
	switch (action.type) {
		// eslint-disable-next-line no-lone-blocks
		case "htmlbody": {
			return { ...state, htmlbody: action.data };
		}
		case "title": {
			return { ...state, title: action.data };
		}
		case "color": {
			return { ...state, color: action.data };
		}
		case "priority": {
			return { ...state, priority: action.data };
		}
		case "label": {
			return { ...state, label: action.data };
		}
		case "reset": { 
			return { ...action.data };
		}
		default: {
			return { ...state };
		}
	}
};

var initialStateNote = {
	title: "",
	htmlbody: "",
	createdOn: "",
	color: "#bebdff",
	priority: "",
	label: "",
};

export default function HomePage() {
	const [showNote, setShowNote] = useState(true);
	const [noteState, noteDispatch] = useReducer(ContentDetail,initialStateNote);
	const [noteDataSet, SetNoteDataSet] = useNotes();
	var modules = useRef({});
	const [response, error, loading, axiosRequest] = useAxios();
	const { modalToggle, setmodalToggle } = useModal();

	useMemo(() => {
		modules.current = {
			toolbar: [
				[{ header: [1, 2, false] }],
				["bold", "italic", "underline", "strike", "blockquote"],
				[
					{ list: "ordered" },
					{ list: "bullet" },
					{ indent: "-1" },
					{ indent: "+1" },
				],
				["link", "image"],
				["clean"],
			],
		};
	}, []);

	useEffect(() => {
		try {
			(async () => {
				var res = await axiosRequest({
					method: "get",
					url: "/api/notes",
				});
				console.log(res);
				SetNoteDataSet(res.notes);
			})();
		} catch (error) {
			console.log("Product list page error", error);
			// Alert("error", "Some error occured!! refresh page and try again");
		}
	}, []);

	async function createNoteHandler() {
		var object = {
			title: noteState.title,
			content: noteState.htmlbody,
			color: noteState.color,
			createdOn: new Date().toDateString(),
			pin: VAR_NotPinnedNotes,
			priority: noteState.priority,
			label: noteState.label,
		};
		console.log(object);
		var res = await axiosRequest({
			method: "post",
			url: "/api/notes",
			data: { note: object },
			headers: {
				authorization: localStorage.getItem(VAR_ENCODE_TOKEN),
			},
		});
		console.log(res);
		noteDispatch({title: "",
		htmlbody: "",
		createdOn: "",
		color: "#bebdff",
		priority: "",
		label: "",});
		SetNoteDataSet(res.notes);
	}

	return (
		<div className="home-page">
			<div>
				<img src={preperation} className="home-holder" alt="singupimage" />
			</div>

			<div className="latest-notes-container">
				<div className="page-title">Latest Notes : </div>
				<div>
					<AllNotes notesdata={noteDataSet} showNoteToggle={setShowNote} noteReducer={noteDispatch}/>
				</div>
			</div>

			<span
				onClick={(e) => {StopPropogation(e);setShowNote(true);}}>
				<FloatAddButton />
			</span>
			{showNote && (
				<div className='modal-fixed-bg-highlight' onClick={() => { setShowNote(false); noteDispatch({ type: "reset",data : initialStateNote }); }}>
					<div className='modal-view-container'>
						<div className="note-editor-container" onClick={(event: React.MouseEvent<HTMLElement>) => StopPropogation(event)}>
							<div
								className="close-note"
								onClick={(e) => {
									StopPropogation(e);
									setShowNote(false);
									noteDispatch({ type: "reset",data:initialStateNote })
								}}>
								<BiXCircle />
							</div>
							<input
								className="note-title-input"
								placeholder="Title note ...."
								onChange={(e) =>
									noteDispatch({ type: "title", data: e.target.value })}
								value={noteState.title}
							/>

							<ReactQuill
								theme="snow"
								modules={modules.current}
								// formats={formats}
								placeholder={"Write Something....."}
								value={noteState.htmlbody}
								onChange={(e) =>
									noteDispatch({ type: "htmlbody", data: e })
								}/>

							<div className="note-editor-action">
								<select
									className="select-tag"
									placeholder="Priority"
									value={noteState.priority}
									onChange={(e) =>
												noteDispatch({ type: "priority", data: e.target.value })}>
									<option value="high">High</option>
									<option value="medium">Medium</option>
									<option value="low">Low</option>
								</select>

								<input
									type="text"
									placeholder="label"
									value={noteState.label}
									onChange={(e) => noteDispatch({ type: "label", data: e.target.value })}/>

								<div className="color-pallette-container">
									<button
										onClick={(e: React.MouseEvent<HTMLElement>) =>
											debounce(
												() => noteDispatch({ type: "color", data: "#bebdff" }),
												500)}
										className="color-pallete"
										style={{ backgroundColor: "#bebdff" }}
										value="#bebdff">
										{noteState.color === "#bebdff" ? <BiCheck /> : ""}
									</button>
									<button
										onClick={(e: React.MouseEvent<HTMLElement>) =>
											debounce(
												() => noteDispatch({ type: "color", data: "#ff9999" }),
												500)}
										className="color-pallete"
										style={{ backgroundColor: "#ff9999" }}
										value="#ff9999">
										{noteState.color === "#ff9999" ? <BiCheck /> : ""}
									</button>
									<button
										onClick={(e: React.MouseEvent<HTMLElement>) =>
											debounce(
												() => noteDispatch({ type: "color", data: "#ffd7bd" }),
												500
											)
										}
										className="color-pallete"
										style={{ backgroundColor: "#ffd7bd" }}
										value="#ffd7bd"
									>
										{noteState.color === "#ffd7bd" ? <BiCheck /> : ""}
									</button>
								</div>

								<span onClick={() => createNoteHandler()}>
									<CreateButton props="Create " />
								</span>
								<span onClick={() => createNoteHandler()}>
									<CreateButton props="Update " />
								</span>
							</div>
						</div>
					</div>
				</div>)}
		</div>
	);
}

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
