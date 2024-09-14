const express = require('express');
// const { books } = require('../data/books.json');
// const { users } = require('../data/users.json');
// const {getAllBooks}=require('../controllers/books-controller');


const {UserModelExport,BookModelExport}= require('../models/index');
const { getAllBooks,getBookByID,getAllIssuedBooks,addNewBook,updateBookByID} = require('../controllers/books-controller');

const router = express.Router();
/**
 * Route: /books
 * Method: GET
 * Description: get all the boks info 
 * Access: Public
 * Parameters: None
 */
router.get('/',getAllBooks);

/**
 * Route: /books/:id
 * Method: GET
 * Description: get the specific book info
 * Access: Public
 * Parameters: Id
 */
router.get('/:id',getBookByID);

/**
 * Route: /books/issued
 * Method: GET
 * Description: Get all issued books
 * Access: Public
 * Parameters: None
 */
router.get("/issued/by-user", getAllIssuedBooks);


/**
 * Route: /
 * Method: POST
 * Description: add a new book into DB
 * Access: Public
 * Parameters: data of the book
 */


// router.post("/", (req, res) => {
//   const { data } = req.body;

//   if (!data) {
//     return res.status(400).json({
//       sucess: false,
//       message: "No Data To Add A Book",
//     });
//   }

//   const book = books.find((each) => each.id === data.id);
//   if (book) {
//     return res.status(404).json({
//       success: false,
//       message: "Id Already Exists !!",
//     });
//   }
//   const allBooks = { ...books, data };
//   return res.status(201).json({
//     success: true,
//     message: "Added Book Succesfully",
//     data: allBooks,
//   });
// });

router.post("/",addNewBook);

// router.put("/updateBook/:id", (req, res) => {
//   const { id } = req.params;
//   const { data } = req.body;

//   const book = books.find((each) => each.id === id);

//   if (!book) {
//     return res.status(400).json({
//       success: false,
//       message: "Book Not Found For This ID",
//     });
//   }

//   const updateData = books.map((each) => {
//     if (each.id === id) {
//       return { ...each, ...data };
//     }

//     return each;
//   });
//   return res.status(200).json({
//     success: true,
//     message: "Updated a Book By Their Id",
//     data: updateData,
//   });
// });

router.put("/updateBook/:id",updateBookByID);



























module.exports = router;
