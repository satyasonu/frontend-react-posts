import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Edit = () => {
    const { state } = useLocation();
  const [title, setTitle] = useState(state.title);
  const [content, setContent] = useState(state.content);
  const [published, setPublished] = useState(state.published);
  const [id, setId] = useState(state.id);  

  const handleSubmit = (e) => {
    e.preventDefault();
    // do something with the form data
    // fetch('http://20.74.186.220:8000/posts/' + state.id, {
    fetch('/posts/' + state.id, {

      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({title : title, content : content, published: published })
    })
      .then(response => response.json())
      // .then(data => console.log(data))
      .catch(error => console.error(error))
    // console.log( {id, title, content, published} );
  };

  return (
    <form onSubmit={handleSubmit} className="centered-form">
      <Link to="/"><button>Home</button></Link>
      <div>
        <label htmlFor="id">ID:</label>
        <input
          type="text"
          id="id"
          value={id}
          disabled={true}
          onChange={(e) => setId(e.target.value)}
          required
        />
      </div>
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
        <label htmlFor="published">Published(true or false):</label>
        <input
          id="published"
          value={published}
          onChange={(e) => setPublished(e.target.value)}
          required
        ></input>
      </div>
      <Link to="/read"><button type="submit">Submit</button></Link><br></br>
      <Link to="/read"><button>Cancel</button></Link><br></br>
    </form>
  );
};

export default Edit;
