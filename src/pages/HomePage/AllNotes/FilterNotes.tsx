import "../HomePage.css";
import React, { useState } from 'react'
import { BiFilter, BiXCircle } from "src/components/UI/Icons/Icons";
import { VAR_RESET } from "src/utils/Route";
import { useReducer } from "react";
import { useLabel } from "src/context/LabelContext";
import { useNotes } from "src/context/NotesContext";
import Notes from "src/components/UI/Notes/Notes";
import { debounce } from "src/utils/Debounce";

type Props = {}

const priority= "priority";
const label = "label";
const sortby = "sortby";


const initialStateFilter ={
    priority: "",
    sortby: "",
    label : ""
}

const FilterReducer = (state, action) => {
	console.log(state, action);
	switch (action.type) {
		// eslint-disable-next-line no-lone-blocks
		case sortby: {
			return { ...state, sortby: action.data };
		}
		case priority: {
			return { ...state, priority: action.data };
		}
		case label: {
			return { ...state, label: action.data };
		}
		case VAR_RESET: { 
			return { ...action.data };
		}
		default: {
			return { ...state };
		}
	}
};

const FilterNotes = (props: any) => {
    const { LabelContextArray, setLabelContextArray } = useLabel();
    const [FilterTab, SetFilterTab] = useState(false);
    const [filterState, filterDispatch] = useReducer(FilterReducer,initialStateFilter )
    const [notesDateContext, SetNoteDataContext] = useNotes();
    console.log(props.notesdata,props.setnotesdate);

    function HandleFilter() { 
        let filteredArray = notesDateContext.filter(note => {
            return (!!filterState.priority && note.priority === filterState.priority) ||
                (!!filterState.label && note.label.includes(filterState.label))
            
        });
        if (!!(filterState.sortby[0] === "f")) { 
            filteredArray.reverse();
        }
        props.setnotesdate(()=>filteredArray);
        console.log(filteredArray);
    }
    
    function SearchHandler(value) { 
        console.log(value);
        value = value.toLowerCase();
        let filteredArray = notesDateContext.filter(note => {
            return (note?.title?.toLowerCase().includes(value)) ||
                (note?.label?.includes(value)) ||
                (note?.content?.toLowerCase().includes(value)) ||
                (note?.pinned?.toLowerCase().includes(value))
            
        });
        props.setnotesdate(()=>filteredArray);
    }
    
    return (
      <div className="home-page-filter">
            <input type="search" onChange={(e) =>
                debounce(() => { SearchHandler(e.target.value) },1000)} />
          <span onClick={()=> SetFilterTab(true)}>
              <BiFilter cursor="pointer" />
          </span>
          {FilterTab &&
              <div className="home-page-filter-list">
                  <div className="filter-toggle-header">
                      <span>Sort & Filter</span>
                        <span onClick={() => {
                            SetFilterTab(false);
                            props.setnotesdate(() => notesDateContext);
                            filterDispatch({ type: VAR_RESET, data: initialStateFilter })
                        }}><BiXCircle /></span>
                  </div>
                  <div>
                      <p>Priority</p>
                      <select
                            className="select-tag"
                            placeholder="Priority"
                            value={filterState.priority}
                            onChange={(e) =>
                                        filterDispatch({ type: priority, data: e.target.value })}>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                  </div>
                  <div>
                      <p>SortBy</p>
                      <select
                            className="select-tag"
                            placeholder="Priority"
                            value={filterState.sortby}
                            onChange={(e) =>
                                        filterDispatch({ type: sortby, data: e.target.value })}>
                            <option value="true">Newest First</option>
                            <option value="false">Latest First</option>
                        </select>
                  </div>    
                  <div>
                      <p>Label</p>
                      <select className="select-tag"
                            placeholder="label"
                            value={filterState.label}
                            onChange={(e) =>
                                        filterDispatch({ type: label, data: e.target.value })}>
                            {LabelContextArray.map(label => (
                                <option value={label}>{label}</option>
                            ))}
                      </select>
                  </div>
                    <button onClick={() => HandleFilter()}>Done</button>
                    <button onClick={() => {
                        props.setnotesdate(() => notesDateContext);
                        filterDispatch({ type: VAR_RESET, data: initialStateFilter })
                    }}>Reset</button>
              </div>
          }
      </div>
  )
}

export default FilterNotes