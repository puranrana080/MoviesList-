import React, { useState } from "react";
import "./AddMovie.css";

const AddMovie = () => {
    const [formData,setFormData]=useState({
        title:"",
        openingText:"",
        date:""
    })

    const handleChange=(name,value)=>{
        setFormData((prev)=>{
            return {...prev,[name]:value}
        })

    }

    const handleFromSubmit = (e)=>{
        e.preventDefault()
        console.log("Form data submittedd",formData)
    }
    console.log(formData)
  return (
    <>
      <div className="add-movie-box">
        <form onSubmit={handleFromSubmit}>
          <label htmlFor="title">Title</label>
          <input onChange={(e)=>handleChange(e.target.name,e.target.value)} value={formData.title} type="text" id="title" name="title" />
          <label htmlFor="openingText">Opening Text</label>
          <textarea onChange={(e)=>handleChange(e.target.name,e.target.value)} value={formData.openingText} id="openingText" name="openingText" rows="5" />
          <label htmlFor="date">Release Date</label>
          <input onChange={(e)=>handleChange(e.target.name,e.target.value)} value={formData.date} type="date" id="date" name="date" />

          <button>Add Movie</button>
        </form>
      </div>
    </>
  );
};

export default AddMovie;
