import React from "react";
import { Link } from "react-router-dom";

export default function Main(){
    return (
        <div className='topbtn'>
            <Link to = '/read'>
                <button>Click to see available posts</button>
            </Link>
        </div>
    )
}