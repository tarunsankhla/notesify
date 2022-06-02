/* eslint-disable no-lone-blocks */
import "src/pages/HomePage/HomePage.css";
import ReactQuill from "react-quill";
import React, { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { debounce } from "src/utils/Debounce";
import {
	FloatAddButton,
	CreateButton,
} from "src/components/UI/Buttons/Buttons";
import {
	BiCheck,
	BiFilter,
	BiXCircle,
} from "src/components/UI/Icons/Icons";
import { useModal } from "src/context/ModalProvider";
import useAxios from "src/customhook/useAxios";
import { VAR_ENCODE_TOKEN, VAR_NOTPINNED_NOTES, VAR_RESET } from "src/utils/Route";
import StopPropogation from "src/utils/StopPropogation";
import { preperation } from "src/assets/holders/holders";
import { useNotes } from "src/context/NotesContext";
import Skeletons from "src/components/common/Skeleton/Skeleton";
import FilterNotes from "./AllNotes/FilterNotes";
import { useLabel } from "src/context/LabelContext";
import { useAuth } from "src/context/AuthContext";
import { Toast } from "src/components/common/Toast/Toast";

const AllNotes = React.lazy(() => import("./AllNotes/AllNotes"));
const htmlbody = "htmlbody";
const title = "title";
const color = "color";
const priority = "priority";
const label = "label";

var initialStateNote = {
	title: "",
	htmlbody: "",
	createdOn: "",
	color: "#bebdff",
	priority: "high",
	label: [],
};

const ContentDetail = (state, action) => {
	console.log(state, action);
	switch (action.type) {
		// eslint-disable-next-line no-lone-blocks
		case htmlbody: {
			return { ...state, htmlbody: action.data };
			break;
		}
		case title: {
			return { ...state, title: action.data };
			break;
		}
		case color: {
			return { ...state, color: action.data };
			break;
		}
		case priority: {
			return { ...state, priority: action.data };
			break;
		}
		case label: {
			
			if (action.data !== "") {
				console.log(action.data);
				if (state.label.includes(action.data)) {
					var index = state.label.includes(action.data);
					// return { ...state, label: [...state.label.slice(0, index), ...state.label.slice(index + 1)] }
					return { ...state, label: [...state.label.filter(i=> i !== action.data)] }
				}
				return { ...state, label: [...state.label, action.data] };
			}
			return { ...state };
			break;
		}
		case VAR_RESET: {
			return { ...action.data };
			break;
		}
		default: {
			
		}
	}
};

export default function HomePage() {
	const [showNote, setShowNote] = useState(false);
	const [NotesArray, SetNotesArray] = useState([]);
	const [noteState, noteDispatch] = useReducer(ContentDetail, initialStateNote);
	const [noteDataSet, SetNoteDataSet] = useNotes();
	var modules = useRef({});
	const [response, error, loading, axiosRequest] = useAxios();
	const { modalToggle, setmodalToggle } = useModal();
	const { LabelContextArray, setLabelContextArray } = useLabel();
	const [newLabel, setNewLabel] = useState("");
	const [showLabel, setShowLabel] = useState(false);
	const { user } = useAuth();
	var Tags = ["Todo", "Goals"];


	function HandeLabel(data) {
		console.log("handle label", data);
		if (!!data) {
			setLabelContextArray(prev => {
				if (!prev.includes(data)) {
					return [...prev, data]
				}
				return [...prev];
			})
		}
	}

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

	useEffect(() => { SetNotesArray(noteDataSet) }, [noteDataSet]);
	useEffect(() => {
		try {
			(async () => {
				var res = await axiosRequest({
					method: "get",
					url: "/api/notes",
				});
				console.log(res);
				SetNoteDataSet(res?.notes || []);
				SetNotesArray(res?.notes || []);
			})();
		} catch (error) {
			console.log("Product list page error", error);
		}
	}, []);

	async function createNoteHandler() {
		var object = {
			title: noteState.title,
			content: noteState.htmlbody,
			color: noteState.color,
			createdOn: new Date().getMonth() + " " + new Date().toDateString(),
			pin: VAR_NOTPINNED_NOTES,
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
		noteDispatch({ type: VAR_RESET, data: initialStateNote });
		SetNoteDataSet(res.notes);
		SetNotesArray(res.notes);
		setShowNote(false);
		Toast("Notes Created!!");
	}

	async function updateNoteHandler() {
		var object = {
			title: noteState.title,
			content: noteState.htmlbody,
			color: noteState.color,
			createdOn: new Date().toDateString(),
			pin: noteState.pin,
			priority: noteState.priority,
			label: noteState.label,
		};
		console.log(object, noteState.id);
		var res = await axiosRequest({
			method: "post",
			url: "/api/notes/" + noteState.id,
			data: { note: object },
			headers: {
				authorization: localStorage.getItem(VAR_ENCODE_TOKEN),
			},
		});
		noteDispatch({ type: VAR_RESET, data: initialStateNote });
		SetNoteDataSet(res.notes);
		SetNotesArray(res.notes);
		setShowNote(false);
		Toast("Updated Note!!")
	}

	const NotesCollection = useMemo(() => { return AllNotes }, []);

	return (
		<div className="home-page">
			<FilterNotes notesdata={NotesArray} setnotesdate={SetNotesArray} />
			{!noteDataSet?.length &&
			<div>
				<img src={preperation} className="holder" alt="singupimage" />
			</div>

			}
			<button  onClick={(e) => { StopPropogation(e); setShowNote(true); }} style={{width:"fit-content"}} className="btn-landing cursive">
				Create New Note
			</button>

			<div className="latest-notes-container">

				<div>
					<NotesCollection notesdata={NotesArray} showNoteToggle={setShowNote} noteReducer={noteDispatch} noteUpdate={updateNoteHandler} />
				</div>
			</div>

			{
				user && <span
					onClick={(e) => { StopPropogation(e); setShowNote(true); }}>
					<FloatAddButton />
				</span>
			}
			{showNote && (
				<div className='modal-fixed-bg-highlight' onClick={() => { setShowNote(false); noteDispatch({ type: VAR_RESET, data: initialStateNote }); }}>
					<div className='modal-view-container'>
						<div className="note-editor-container" onClick={(event: React.MouseEvent<HTMLElement>) => StopPropogation(event)}>
							<div
								className="close-note"
								onClick={(e) => {
									StopPropogation(e);
									setShowNote(false);
									noteDispatch({ type: VAR_RESET, data: initialStateNote })
								}}>
								<BiXCircle />
							</div>
							<div className="nl-flex">
								<input
									className="note-title-input"
									placeholder="Title note ...."
									onChange={(e) => {
										noteDispatch({ type: title, data: e.target.value });
									}}
									value={noteState.title}
									/>
								<span onClick={() => setShowLabel(true)}><CreateButton props="Add Label" /></span>
							</div>

							<ReactQuill
								theme="snow"
								modules={modules.current}
								// formats={formats}
								placeholder={"Write Something....."}
								value={noteState.htmlbody}
								onChange={(e) =>
									noteDispatch({ type: htmlbody, data: e })
								} />

							<div className="note-editor-action">
								<select
									className="select-tag"
									placeholder="Priority"
									value={noteState.priority}
									onChange={(e) =>
										noteDispatch({ type: priority, data: e.target.value })}>
									<option value="high">High</option>
									<option value="medium">Medium</option>
									<option value="low">Low</option>
								</select>

								<div className="color-pallette-container">
									<button
										onClick={(e: React.MouseEvent<HTMLElement>) =>
											debounce(
												() => noteDispatch({ type: color, data: "#bebdff" }),
												500)}
										className="color-pallete"
										style={{ backgroundColor: "#bebdff" }}
										value="#bebdff">
										{noteState.color === "#bebdff" ? <BiCheck /> : ""}
									</button>
									<button
										onClick={(e: React.MouseEvent<HTMLElement>) =>
											debounce(
												() => noteDispatch({ type: color, data: "rgb(255 101 132)" }),
												500)}
										className="color-pallete"
										style={{ backgroundColor: "rgb(255 101 132)" }}
										value="rgb(255 101 132)">
										{noteState.color === "rgb(255 101 132)" ? <BiCheck /> : ""}
									</button>
									<button
										onClick={(e: React.MouseEvent<HTMLElement>) =>
											debounce(
												() => noteDispatch({ type: color, data: "rgb(251 172 12)" }),
												500
											)
										}
										className="color-pallete"
										style={{ backgroundColor: "rgb(251 172 12)" }}
										value="rgb(251 172 12)"
									>
										{noteState.color === "rgb(251 172 12)" ? <BiCheck /> : ""}
									</button>
									<button
										onClick={(e: React.MouseEvent<HTMLElement>) =>
											debounce(
												() => noteDispatch({ type: color, data: "#539987" }),
												500)}
										className="color-pallete"
										style={{ backgroundColor: "#539987" }}
										value="#539987">
										{noteState.color === "#539987" ? <BiCheck /> : ""}
									</button>
									<button
										onClick={(e: React.MouseEvent<HTMLElement>) =>
											debounce(
												() => noteDispatch({ type: color, data: "#8c7aa9" }),
												500)}
										className="color-pallete"
										style={{ backgroundColor: "#8c7aa9" }}
										value="#8c7aa9">
										{noteState.color === "#8c7aa9" ? <BiCheck /> : ""}
									</button>
								</div>
								{!noteState.id ?
									<span onClick={() => createNoteHandler()}>
										<CreateButton props="Create " />
									</span>
									: <span onClick={() => updateNoteHandler()}>
										<CreateButton props="Update " />
									</span>}
								
								{showLabel &&
									<div className="label-fixed-container" onClick={(e) => { 
										// e.preventDefault();
										console.log((e.target as HTMLDivElement).className);
										if ((e.target as HTMLDivElement).classList.contains("label-fixed-container")) { 
											setShowLabel(false)
										}
									}}>
										<div className="label-list-container">
											<button onClick={()=>setShowLabel(false)} className="btn-close"><BiXCircle /></button>
											<div className="label-list-add">
												<input type="text"
													placeholder="label"
														value={newLabel}
													className="full-input"
													style={{backgroundColor :"white"}}
													onChange={(e) => {
														if (!!e.target.value) {
															setNewLabel(e.target.value);
														}
													}} />
												<span className="flex">
													
													<span onClick={() => {
														// noteDispatch({ type: "label", data: newLabel });
														setNewLabel("");
														HandeLabel(newLabel);
															// setShowLabel(false);
														}}>
															<CreateButton props="Create Label" />
														</span>
													</span>
											</div>
											<div className="label-list">
												{LabelContextArray.map(i => (
													<li>
														<input type="checkbox" value={i} id="" checked={noteState.label.includes(i)}
															onClick={() => { noteDispatch({ type: "label", data: i }); }} />
														{i}
													</li>))
												}
											</div>
										
											</div>
									</div>
								}
								
							</div>
						</div>
					</div>
				</div>)}
		</div>
	);
}
