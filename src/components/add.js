import React, { useState } from "react";
import { Link } from "react-router-dom";
const styles = {
    color: 'green'
  }

const Add = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState("");
  const [show, setShow] = useState(false); 

  const handleSubmit = (e) => {
    e.preventDefault();
    // do something with the form data
    // fetch('http://20.74.186.220:8000/posts', {
    fetch('/posts', {

      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title : title, content : content, published: published })
    })
      .then(response => {
        if (response.status === 201){
            setShow(true)
        }
      })
      .then(data =>{ console.log(data)})
      .catch(error => console.error(error))
    // console.log( {id, title, content, published} );
    setTitle("")
    setContent("")
    setPublished("")
  };

  return (
    <form onSubmit={handleSubmit} className="centered-form">
      <Link to="/read"><button>Back</button></Link><br></br>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <textarea
          type="text"
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="published">Published:</label>
        <input
          id="published"
          value={published}
          onChange={(e) => setPublished(e.target.value)}
          required
        ></input>
      </div>
      <button type="submit">Submit</button><br></br>
      <Link to="/"><button>Home</button></Link>
      <div>
        {show && <p style={styles}>Data Submitted Successfully!</p>}
      </div>
    </form>
    
  );
};

export default Add;