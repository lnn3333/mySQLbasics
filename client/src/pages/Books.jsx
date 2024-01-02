import React from 'react'
import {useEffect} from 'react'
import {useState} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([])

  useEffect(()=>{
    const fecthAllBooks = async ()=> {
      try{
        const res= await axios.get(`http://localhost:8800/books`)
        setBooks(res.data);
        console.log(res)
      }
      catch(err){
        console.log(err);
      }
    }
    fecthAllBooks()
  },[])
  return <div>
      <h1>Lama Book Shop</h1>
      <div className="books">
        {books.map((book)=>(
          <div className='book'>
            {book.cover && <img src={books.cover} alt=""/>}
            <h2>{book.title}</h2>
            <p>{book.desc}</p>
            <span>{book.price}</span>
          </div>
        ))}
      </div>
      <button><Link to="/add">Add new book</Link></button>
  </div>
  
}

export default Books