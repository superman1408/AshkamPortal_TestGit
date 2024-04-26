import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

import { getPosts, salarySlipData } from '../../action/posts';
import ComboBox from './ComboBox';

const FileUploadForm = () => {
    const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [id, setId] = useState('');
  const _id = useParams();
  const [currentId, setCurrentId] = useState(_id);
  const posts = useSelector((state) => state.posts);


  useEffect(() => {
    if (!currentId) return setCurrentId(id);
    dispatch(getPosts()).then(() => {
        console.log("Data is recieved in file Upload Form");
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentId, posts]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('pdf', file);
    try {
      dispatch(salarySlipData(currentId, file)).then(()=>{
        console.log("File is send from file upload form handleSubmit function..!!");
      })
      alert('PDF uploaded successfully');
    } catch (error) {
      console.error('Error uploading PDF', error);
      alert('Error uploading PDF');
    }
  };

  return (
    <div>
      <h2>Upload PDF</h2>
      <form onSubmit={handleSubmit}>
        <div>
            <ComboBox posts={posts} setCurrentId={setCurrentId} />
        </div>
        <label>
          Choose PDF:
          <input type="file" onChange={handleFileChange} />
        </label>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default FileUploadForm;
