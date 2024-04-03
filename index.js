import express from "express"

const app = express(); 
app.use(express.json());

const books = [];

app.post("/books", (req, res) => {
    try{
        if(
            typeof req.body.author === "string" &&
            typeof req.body.title ===  "string" &&
            typeof req.body.status === "boolean"
        ){
        const {author,title,status} = req.body
        books.push({author,title,status,id : books.length})
        res.status(201).json("Book added success")
        } else {
            res.status(406).json({error : "Input error"});
        }
    }
    catch(err){
        res.status(500).json({error : "error books"})
    }
});

app.get("/books", (req, res) => {
    try {
        res.json(books);
      } catch (err) {
        res.status(500).json(err);
    }
});

app.get("/books/:id", (req, res) => {
    try {
        let result ;
        books.forEach((elem) => {
          if (elem.id === req.params.id) {
            result = elem;
          }
        });
        if(!result){
            res.status(400).json({message : "not found"})
        }
        else{
            res.json(result)
        }
      } catch (err) {
        res.status(500).json(err);
      }
});

app.put("/books/:id", (req, res) => {
    try{
        books.forEach((elem)=>{
            if(elem.id === req.params.id){
                for(let upt in req.body){
                    elem[upt] = req.body[upt]
                }
                res.json(elem)
            }
        })
    }
    catch {
        res.status(404).json("Not Found")
    }
});

app.delete("/books/:id", (req, res) => {
    try{
        for(let i = 0 ; i < books.length ; ++i){
            if(books[i].id == req.params.id){
                [books[i],books[books.length]] = [books[books.length],books[i]]
                books.legnth -= 1
                res.status(202).json("Delete succses")
            }
        }
        res.status(404).json("not found")
    }
    catch{
        res.status(500).json("books not deleted")
    }
});

app.listen(3000, (err) => {
    if (err) {
        console.log(err);
      }
      console.log("server ok");
});