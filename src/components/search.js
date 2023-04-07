import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import '../index.css'

const Search = () => {
    const { state } = useLocation();
    const [error, setError] = useState(null);
    const [data, setData] = useState([]);
    const [published, setPublished] = useState("")
    // console.log(state)
    useEffect(() => {
        fetch(`/posts/${state}`, {
            method : 'GET',
            mode: 'cors'
        })
        .then(res => {
            if (res.status === 400) {
                throw new Error('ID is not available, try with other ID');
              }
            else if (res.status === 200) {
                return res.json();
              }
              else if (res.status === 422) {
                throw new Error('You have not entered any ID. Please enetr a valid ID');
              }
        })
        .then(data => {
            setData(data['post_detail']);
            setPublished(data['post_detail']['published'].toString());
        })
        .catch(error => {
            setError(error);
          });
          // eslint-disable-next-line
    },[]);
    if (error) {
        return <div className='topbtn'>Error: {error.message}. Please refresh to see error. If it still persists, mail to sbssunu@gmail.com<br></br> <Link to="/read"><button>Back</button></Link></div>;
      }
    else if(data !== undefined)
      return (
            <div >
                <div className='topbtn'>
                    <Link to="/read"><button>Back</button></Link>
                    <Link to="/latest"><button>Latest Post</button></Link>
                    <Link to = '/'><button>Go Home</button></Link>
                </div>
                <table className='tableRead' style={{ border: '1px solid black', borderColor: 'black', color: 'azure' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid black', padding: 10, color: 'black' }}>Id</th>
                            <th style={{ border: '1px solid black', padding: 10, color: 'black' }}>Title</th>
                            <th style={{ border: '1px solid black', padding: 10, color: 'black' }}>Content</th>
                            <th style={{ border: '1px solid black', padding: 10, color: 'black' }}>Published</th>
                            <th style={{ border: '1px solid black', padding: 10, color: 'black' }}>Created at</th>
                            </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style={{ border: '1px solid black', padding: 10, color: 'black' }}>{data.id}</td>
                            <td style={{ border: '1px solid black', padding: 10 }}><Link to = {'/edit'} state={data}>{data.title}</Link></td>
                            <td style={{ border: '1px solid black', padding: 10, color: 'black' }}>{data.content}</td>
                            <td style={{ border: '1px solid black', padding: 10, color: 'black' }}>{published}</td>
                            <td style={{ border: '1px solid black', padding: 10, color: 'black' }}>{data.created_at}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
}

export default Search;