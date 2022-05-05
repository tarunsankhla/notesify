import "../HomePage.css";
import React, { useState } from 'react'
import { BiFilter, BiXCircle } from "src/components/UI/Icons/Icons";

type Props = {}

const FilterNotes = (props: Props) => {
    const [FilterTab, SetFilterTab] = useState(false);
  return (
      <div className="home-page-filter">
          <input type="search" />
          <span onClick={()=> SetFilterTab(true)}>
              <BiFilter cursor="pointer" />
          </span>
          {FilterTab &&
              <div className="home-page-filter-list">
                  <div className="filter-toggle-header">
                      <span>Sort & Filter</span>
                      <span onClick={() => SetFilterTab(false)}><BiXCircle /></span>
                  </div>
                  <div>
                      <p>Priority</p>
                      <select>
                          <option>high</option>
                          <option>medium</option>
                          <option>low</option>
                      </select>
                  </div>
                  <div>
                      <p>SortBy</p>
                      <select>
                          <option>Latest First</option>
                          <option>Newest First</option>
                      </select>
                  </div>    
                  <div>
                      <p>Label</p>
                      <select>
                          <option>First</option>
                          <option>Second</option>
                      </select>
                  </div>
                  <button>Done</button>
              </div>
          }
      </div>
  )
}

export default FilterNotes