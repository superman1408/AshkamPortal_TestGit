import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

import { Grid } from '@mui/material';

import FileBase from "react-file-base64";

import { getPosts, salarySlipData } from '../../action/posts';
import ComboBox from './ComboBox';

const FileUploadForm = () => {
    const dispatch = useDispatch();
    // const [formData, setFormData] = useState({
    //   title: "",
    //   pdf: "",
    //   indentify: ""
    // });
  const [file, setFile] = useState("");
  const [title, setTitle] = useState("");

  // const [id, setId] = useState('');
  const _id = useParams();
  const [currentId, setCurrentId] = useState(_id);
  const posts = useSelector((state) => state.posts);


  useEffect(() => {
    if (!currentId) return setCurrentId(_id);
    dispatch(getPosts())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentId, posts]);

  // const handleFileChange = (e) => {
  //   const selectedFile = e.target.files[0];
  //   setFile(selectedFile);
  // };

  // const handleIdChange = (e) => {
  //   setId(e.target.value);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(title);
    console.log(file);
    console.log(currentId);
    // setFormData({...formData, title: title, pdf: file, indentify: currentId });
    const formData = new FormData();
    formData.append('pdf', file); // Append the file to the FormData object
    formData.append('title', title); // Append the title to the FormData object
    formData.append('indentify', currentId); // Append the identifier to the FormData object

    console.log(formData);
    // try {
    //   dispatch(salarySlipData(currentId, file)).then(()=>{
    //     console.log("File is send from file upload form handleSubmit function..!!");
    //   })
    //   alert('PDF uploaded successfully');
    // } catch (error) {
    //   console.error('Error uploading PDF', error);
    //   alert('Error uploading PDF');
    // }
  };



  return (
    <div>
      <h2>Upload PDF</h2>
      <form onSubmit={handleSubmit}>
        <div>
            <ComboBox posts={posts} setCurrentId={setCurrentId} />
        </div>
        {/* <div>
          <label htmlFor="attachment">Attachment</label>
          <input id="attachment" name="attachment" type="file" onChange={handleFileChange} required/>
        </div> */}
        {/* <Grid sx={{ marginTop: "40px" }}>
          <FileBase
            type="file"
            multiple={false}
            fileName="PaySlip.pdf"
            onDone={({ base64 }) =>
              setFile({ ...file, selectedFile: base64 })
            }
          />
        </Grid> */}
            <br />
            <input
              type="text"
              placeholder="Title"
              required
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <input
              type="file"
              accept="application/pdf"
              required
              onChange={(e) => setFile(e.target.files[0])}
            />
            <br />
            <button  type="submit">
              Submit
            </button>
      </form>
    </div>
  );
};

export default FileUploadForm;
