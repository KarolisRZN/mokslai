const fs = require('fs');
const path = require('path');

console.log(__dirname);

const dir = path.join(__dirname, "data.txt");

console.log(dir);
//read file
const deleteFile = ()=>{
    fs.deleteFile(dir, "utf8", (err, data)=>{
if(err){
    console.log(err);
    return;
}

console.log(data);
    });
};

deleteFile();