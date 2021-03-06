import React, { useEffect } from 'react';
import { archive } from 'src/assets/holders/holders';
import Skeleton from 'src/components/common/Skeleton/Skeleton';
import ArchiveNotes from 'src/components/UI/Notes/ArchiveNotes';
import { useArchive } from 'src/context/ArchiveContext';
import useAxios from 'src/customhook/useAxios';
import { VAR_ENCODE_TOKEN } from 'src/utils/Route';
import "./ArchivePage.css";

const ArchivePage = () => {
  const [response, error, loading, axiosRequest] = useAxios();
  const { ArchiveContextArray, setArchiveContextArray } = useArchive();
  useEffect(() => {
    try {
      (async () => {
        var res = await axiosRequest({
          method: "get",
          url: "/api/archives",
          headers: {
            authorization: localStorage.getItem(VAR_ENCODE_TOKEN)
          },
        });
      })();;
    } catch (error) {
      console.log("Product list page error", error);
      // Alert("error", "Some error occured!! refresh page and try again");
    }
  }, [])
  return (
    <div>
      <div className="notes-container">
        <div className="page-title">Archive Notes : </div>
        <div className='allnotes-container'>
          {
            ArchiveContextArray.length ?
              ArchiveContextArray?.map((note: any) => (
                <ArchiveNotes key={note._id} props={note} />
              ))
              :
              <div>
                <img src={archive} className="holder" alt="archive note" />
                <Skeleton />
              </div>
          }
        </div>
      </div>
    </div>
  )
}

export default ArchivePage