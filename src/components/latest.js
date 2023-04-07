import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Latest(){
  const [data, setData] = useState([]);
  const [published, setPublished] = useState("")
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // fetch('http://20.74.186.220:8000/posts/latest')
    fetch('http://127.0.0.1:8000/posts/latest',{
      mode: 'cors'
    })
      .then(response => (response.json()))
      .then(data => {
        setData(data['Latest Post']);
        setPublished(data['Latest Post']['published'].toString());
        // console.log((data['Latest Post']['published'].toString()))
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}. Please refresh to see error. If it still persists, mail to sbssunu@gmail.com</div>;
  }

  return ( 
    <div>
      <div className='topbtn'>
        <Link to="/"><button>Back</button></Link>
        <Link to="/latest"><button>Latest Post</button></Link>
        <Link to = '/add'><button>Add a new post</button></Link>
        <Link to = '/'><button>Go to Home</button></Link>
      </div>
      <table className='tableRead' style={{ border: '1px solid black', borderColor: 'black' }}>
      <thead>
              <tr>
                <th style={{ border: '1px solid black', padding: 10 }}>ID</th>
                <th style={{ border: '1px solid black', padding: 10 }}>Title</th>
                <th style={{ border: '1px solid black', padding: 10 }}>Content</th>
                <th style={{ border: '1px solid black', padding: 10 }}>Published</th>
                <th style={{ border: '1px solid black', padding: 10 }}>Create At</th>
              </tr>
        </thead>
        <tbody>
            <tr>
              <td style={{ border: '1px solid black', padding: 10 }}>{data.id}</td>
              <td style={{ border: '1px solid black', padding: 10 }}><Link to = {'/edit'} state={data}>{data.title}</Link></td>
              <td style={{ border: '1px solid black', padding: 10 }}>{data.content}</td>
              <td style={{ border: '1px solid black', padding: 10, color: 'black' }}>{published}</td>
              <td style={{ border: '1px solid black', padding: 10 }}>{data.created_at}</td>
            </tr>
        </tbody>
      </table>
    </div>
  );
}
