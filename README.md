# Library-management-system-by-MongoDB
  this project is about using a database for the libraray management system only for the backend

# MVC Architecture ----> Model View Controller Architecture
Model >> Bundle of View And Controller (frontend + backend) Depicts structure of MongoDB collection View >> Defines how it looks (frontend (Handled by React.js In this project)) Controllers >> Brain or Logical Part of a Route (Backend)
>>books.controllers.js >>users.controllers.js

# Schema - tells us how values are stored in our files / database
    id : number 
    name : string 
    age : number 
    gender : char || varchar(1)

# Model - doesn't specify the type but tells the values
    id : 1 
    name : yash 
    age : 22 
    gender : 'M'

Referential Integrity
        Users file                          Books file
        issuedBook(foreign key)     =       id(Primary Key)
ids will be auto generated

# DTO (Data Transfer Object)
When we need to transfer information from one object to another without using dot operator(.) we use DTO , it needs certain packages to be installed :

eg : var obj main = { name age id gender }

        ||        
        ||
        DTO
        ||
        ||        

var obj copy =  {
                    name 
                    age 
                    id 
                    gender
                }