import React, { useEffect } from 'react';
import ArchiveNotes from 'src/components/UI/Notes/ArchiveNotes';
import { useArchive } from 'src/context/ArchiveContext';
import useAxios from 'src/customhook/useAxios';
import { VAR_ENCODE_TOKEN } from 'src/utils/Route';
import AllNotes from '../HomePage/AllNotes/AllNotes';
import "./ArchivePage.css";

const ArchivePage = () => {
  const [response, error, loading, axiosRequest] = useAxios();
  const { ArchiveContextArray, setArchiveContextArray } = useArchive();
  useEffect(() => { 
    try {
			(async () => {
				var res = await  axiosRequest({
          method: "get",
          url: "/api/archives",
          headers: {
            authorization: localStorage.getItem(VAR_ENCODE_TOKEN)
          },
        });
        console.log(res);
        // setArchiveContextArray(res.archives);
			})();;
		} catch (error) {
			console.log("Product list page error", error);
			// Alert("error", "Some error occured!! refresh page and try again");
		}
  },[])
  return (
    <div> <div className="latest-notes-container">
    <div className="page-title">Latest Notes : </div>
    {/* <div>
      <AllNotes props={ArchiveContextArray} />
      </div> */}
      <div className='allnotes-container'>
            {
                ArchiveContextArray?.map((note: any) => (
                    <ArchiveNotes key={note._id} props={note} />
                ))}
        </div>
  </div></div>
  )
}

export default ArchivePage