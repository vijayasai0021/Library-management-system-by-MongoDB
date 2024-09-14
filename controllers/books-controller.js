const {UserModelExport,BookModelExport}= require('../models/index');
const IssuedBook = require('../dtos/book-dtos.js');


// to get all the books info
exports.getAllBooks=async(req,res)=>{
    const books = await BookModelExport.find();

    if(books.length===0){
        res.status(404).json({
            success:false,
            message:'no Books data found'
        })
    }
    res.status(200).json({
        success:true,
        data:books
    })
};


// getting a book by defined ID
exports.getBookByID = async(req,res)=>{
    const { id } = req.params;
  const book = await BookModelExport.findById(id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book Not Found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Found The Book By Their Id",
    data: book,
  });
};

// get allIssued books

exports.getAllIssuedBooks = async (req, res) => {
  const users = await UserModelExport.find({
    issuedBook : { $exists:true},
  }).populate("issuedBook");

    // data transfer object(DTO)
    const issuedBooks = users.map((each)=>new IssuedBook(each));

  if (issuedBooks.length === 0){
       return res.status(404).json({
         success: false,
         message: "No Book Have Been Issued Yet..",
       });
     }
     return res.status(200).json({
       success: true,
       message: "Users With The Issued Books...",
       data: issuedBooks,
     });
}


// to add new book

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

exports.addNewBook = async (req,res)=>{
  const { data } = req.body;
  
  if (!data) {
    return res.status(400).json({
      sucess: false,
      message: "No Data To Add A Book",
    });
  }

  await BookModelExport.create(data);
  const allBooks  = await BookModelExport.find();

    return res.status(201).json({
    success: true,
    message: "Added Book Succesfully",
    data: allBooks,
  });

}

// update a book by id

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

exports.updateBookByID = async (req,res)=>{
  const { id } = req.params;
  const { data } = req.body;

  const updateData = await BookModelExport.findOneAndUpdate(
    {
      _id:id,
    },
    data,
    {
      new:true
    }
  );

  return res.status(200).json({
    success: true,
    message: "Updated a Book By Their Id",
    data: updateData,
  });

}


