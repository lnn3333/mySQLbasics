import express from "express"
import mysql2 from "mysql2"
import cors from "cors"

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql2.createConnection({
    host:"localhost",
    user:"root",
    password:"Klinh123#",
    database:"test"
    
})


app.get("/", (req,res)=>{
    res.json("hello this is the backend")
})

app.get("/books", (req,res)=>{
    const q = "SELECT * FROM test.books;";
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)

    })
})

app.post("/books", (req,res)=>{
    const q = "INSERT INTO books(`title`, `desc`,`price`, `cover`) VALUES (?)";
    const values = 
        [req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
        ]

    db.query(q, [values], (err,data)=>{
        if(err) return res.json(err)
        return res.json(data);
    })
})

app.delete("/books/:id",(req,res)=>{
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?"

    db.query(q,[bookId], (err,data)=>{
        if(err) return res.json(err);
        return res.json("Book has been delete successfully")
    })
})

app.put("/books/:id",(req,res)=>{
    const bookId = req.params.id;
    const q = "UPDATE  books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?"
    const value= 
        [req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
        ]
    

    db.query(q, [...value,bookId], (err,data)=>{
        if(err) return res.json(err);
        return res.json(data)
    })
})

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values,bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});


app.listen(8800, ()=>{
    console.log("Connect to backend!")
})