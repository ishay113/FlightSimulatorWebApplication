const http=require('http');
const fs=require('fs')
const model =require('/Model/SearchInFile')

function displayFormCommand(req, res){
    fs.readFile('/View/index.html','utf8',(err,data)=>{
        if(err)
            console.log(err)
        else
            res.write(data)
            res.end()
    })
}

function searchTextCommand(req,res){
    var result = model.searchText('hello', 'hello world\n good bye\n')
    res.write(result)
    res.end()
}

let commands = new Map()
commands.set('/',displayFormCommand)
commands.set('/search', searchTextCommand)

const exampleOldServer = http.createServer((req, res)=>{
    if(commands.has(req.url))
        commands.get(req.url)(req,res)
    else
        res.write("Invalid request")
})
exampleOldServer.listen(8080, ()=>console.log("exampleOldServer started on port 8080"))