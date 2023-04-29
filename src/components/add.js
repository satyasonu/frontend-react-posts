import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const styles = {
    color: 'green'
  }

const Add = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState("");
  const [show, setShow] = useState(false); 
  const navigate = useNavigate();
  const [count, setCount] = useState(10);

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
    // setTitle("")
    // setContent("")
    // setPublished("")
    const timeoutId = setTimeout(() => {
      navigate('/read');
    }, 10000);
    const timer = setInterval(() => {
      setCount(count => {
        if (count === 0) {
          clearInterval(timer);
        }
        else{
        return count - 1;}
      });
    }, 1000);
    // return () => 

    return () => {
      clearTimeout(timeoutId);
      clearInterval(timer);
    };
  };

  return (
    <form onSubmit={handleSubmit} className="centered-form">
      <div className="scroll">WARNING! DO NOT REFRESH THIS PAGE.</div>
      <Link to="/read" disabled= {show}><button disabled= {show}>Back</button></Link><br></br>
      { show && <p>You will be redirected to the main page in {count} seconds...</p>}
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
      <button type="submit" disabled= {show}>Submit</button><br></br>
      <Link to="/"><button disabled= {show}>Home</button></Link>
      <div>
        {show && <p style={styles}>Data Submitted Successfully!</p>}
      </div>
    </form>
    
  );
};

export default Add;