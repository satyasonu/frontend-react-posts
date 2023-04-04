import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../index.css'

export default function Read(){
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('http://20.74.186.220:8000/posts')
      .then(response => (response.json()))
      .then(data => {
        setData(data.data);
        // console.log(data)
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className='topbtn'>Loading...</div>;
  }

  if (error) {
    return <div className='topbtn'>Error: {error.message}. Please refresh to see error. If it still persists, mail to sbssunu@gmail.com</div>;
  }

  return ( 
    <div>
      <div className='topbtn'>
        <Link to="/"><button>Back</button></Link>
        <Link to="/latest"><button>Latest Post</button></Link>
        <Link to = '/add'><button>Add a new post</button></Link>
        <Link to = '/'><button>Go Home</button></Link>
      </div>
    
      <table className='tableRead' style={{ border: '1px solid black', borderColor: 'black' }}>
      <thead>
              <tr>
                <th style={{ border: '1px solid black', padding: 10 }}>ID</th>
                <th style={{ border: '1px solid black', padding: 10 }}>Title</th>
                {/* <th style={{ border: '1px solid black', padding: 10 }}>Content</th> */}
                <th style={{ border: '1px solid black', padding: 10 }}>Published</th>
                <th style={{ border: '1px solid black', padding: 10 }}>Create At</th>
              </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td style={{ border: '1px solid black', padding: 10 }}>{item.id}</td>
              <td style={{ border: '1px solid black', padding: 10 }}><Link to = {'/edit'} state={item}>{item.title}</Link></td>
              {/* <td style={{ border: '1px solid black', padding: 10 }}>{item.content}</td> */}
              <td style={{ border: '1px solid black', padding: 10 }}>{item.published.toString()}</td>
              <td style={{ border: '1px solid black', padding: 10 }}>{item.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
