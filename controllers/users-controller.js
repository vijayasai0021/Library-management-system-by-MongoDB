const {UserModelExport,BookModelExport}= require('../models/index');

//localhost:8081/users
// router.get("/", (req, res) => {
//   res.status(200).json({
//     success: true,
//     data: users,
//   });
// });
exports.getAllUsers = async (req,res)=>{
 const users = await UserModelExport.find();

 if(users.length===0){
    return res.status(404).json({
        success:"fail",
        message: "no users info found",
    })
 }

 res.status(200).json({
    success: true,
    data: users,
  });
}


// router.get("/:id", (req, res) => {
//   // const  id  = req.params.id;
//   const { id } = req.params;
//   console.log(req.params);
//   const user = users.find((each) => each.id === id);
//   if (!user) {
//     return res.status(404).json({
//       success: false,
//       message: "User Doesn't Exist !!",
//     });
//   }
//   return res.status(200).json({
//     success: true,
//     message: "User Found",
//     data: user,
//   });
// });

exports.getSingleUserById = async(req,res)=>{
    const { id } = req.params;
    const user =  await UserModelExport.findById({_id:id});
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Doesn't Exist !!",
    });
  }
  return res.status(200).json({
    success: true,
    message: "User Found",
    data: user,
  });
}




// router.post("/", (req, res) => {
//   const { id, name, surname, email, subscriptionType, subscriptionDate } =
//     req.body;

//   const user = users.find((each) => each.id === id);

//   if (user) {
//     return res.status(404).json({
//       success: false,
//       message: "User With The ID Exists",
//     });
//   }

//   users.push({
//     id,
//     name,
//     surname,
//     email,
//     subscriptionType,
//     subscriptionDate,
//   });

//   return res.status(201).json({
//     success: true,
//     message: "User Added Succesfully",
//     data: users,
//   });
// });

exports.createNewUser = async (req,res)=>{
    const {_id, name, surname, email,issuedDate,returnDate, subscriptionType, subscriptionDate } = req.body;
    
    const newuser =  await UserModelExport.create({
       _id,
        name, 
        surname, 
        email,
        issuedDate,
        returnDate, 
        subscriptionType, 
        subscriptionDate
      });
    const updatedUsers = await UserModelExport.find();
  return res.status(201).json({
    success: true,
    message: "User Added Succesfully",
    data: updatedUsers,
  });
}



// router.put("/:id", (req, res) => {
//   const { id } = req.params;
//   const { data } = req.body;

//   const user = users.find((each) => each.id === id);
//   if (!user) {
//     return res.status(404).json({
//       success: false,
//       message: "User Doesn't Exist !!",
//     });
//   }
//   const updateUserData = users.map((each) => {
//     if (each.id === id) {
//       return {
//         ...each,
//         ...data,
//       };
//     }
//     return each;
//   });
//   return res.status(200).json({
//     success: true,
//     message: "User Updated !!",
//     data: updateUserData,
//   });
// });
exports.updateUserData = async (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const updatedUserData = await UserModelExport.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        ...data,
      },
    },
    { new: true }
  );
  return res.status(200).json({
    success: true,
    message: "User Updated !!",
    data: updatedUserData,
  });
};



// router.delete("/:id", (req, res) => {
//   const { id } = req.params;
//   const user = users.find((each) => each.id === id);
//   if (!user) {
//     return res.status(404).json({
//       success: false,
//       message: "User Doesn't Exist !!",
//     });
//   }
//   const index = users.indexOf(user);
//   users.splice(index, 1);

//   return res
//     .status(200)
//     .json({ success: true, message: "Deleted User..", data: users });
// });


exports.deleteUser = async (req,res)=>{
  const { id } = req.params;
  const user = await UserModelExport.deleteOne({_id: id});
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User Doesn't Exist !!"
    });
  }
 return res.status(200).json({
  success:true,
  data:user
 });
}





// router.get("/subscription-details/:id", (req, res) => {
//   const { id } = req.params;
//   const user = users.find((each) => each.id === id);

//   if (!user) {
//     return res.status(404).json({
//       success: false,
//       message: "User With The ID Didnt Exist",
//     });
//   }

//   const getDateInDays = (data = "") => {
//     let date;
//     if (data === "") {
//       date = new Date();
//     } else {
//       date = new Date(data);
//     }
//     let days = Math.floor(date / (1000 * 60 * 60 * 24));
//     return days;
//   };

//   const subscriptionType = (date) => {
//     if (user.subscriptionType === "Basic") {
//       date = date + 90;
//     } else if (user.subscriptionType === "Standard") {
//       date = date + 180;
//     } else if (user.subscriptionType === "Premium") {
//       date = date + 365;
//     }
//     return date;
//   };

//   // Jan 1 1970 UTC
//   let returnDate = getDateInDays(user.returnDate);
//   let currentDate = getDateInDays();
//   let subscriptionDate = getDateInDays(user.subscriptionDate);
//   let subscriptionExpiration = subscriptionType(subscriptionDate);

//   // console.log("returnDate ", returnDate);
//   //   console.log("currentDate ", currentDate);
//   //     console.log("subscriptionDate ", subscriptionDate);
//   //       console.log("subscriptionExpiration ", subscriptionExpiration);

//   const data = {
//     ...user,
//     isSubscriptionExpired: subscriptionExpiration < currentDate,
//     daysLeftForExpiration:
//       subscriptionExpiration <= currentDate
//         ? 0
//         : subscriptionExpiration - currentDate,
//     fine:
//       returnDate < currentDate
//         ? subscriptionExpiration <= currentDate
//           ? 100
//           : 50
//         : 0,
//   };
//   return res.status(200).json({
//     success: true,
//     message: "Subscription detail for the user is: ",
//     data,
//   });
// });


exports.getSubscriptionDetailsById = async (req, res)=>{
  const { id } = req.params;
  // find({_id:id})
  const user = await UserModelExport.findById(id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User With The ID Didnt Exist"
    });
  }

  const getDateInDays = (data = "") => {
    let date;
    if (data === "") {
      date = new Date();
    } else {
      date = new Date(data);
    }
    let days = Math.floor(date / (1000 * 60 * 60 * 24));
    return days;
  };

  const subscriptionType = (date) => {
    if (user.subscriptionType === "Basic") {
      date = date + 90;
    } else if (user.subscriptionType === "Standard") {
      date = date + 180;
    } else if (user.subscriptionType === "Premium") {
      date = date + 365;
    }
    return date;
  };
  let returnDate = getDateInDays(user.returnDate);
  let currentDate = getDateInDays();
  let subscriptionDate = getDateInDays(user.subscriptionDate);
  let subscriptionExpiration = subscriptionType(subscriptionDate);

    const data = {
      ...user,
      isSubscriptionExpired: subscriptionExpiration < currentDate,
      daysLeftForExpiration:
        subscriptionExpiration <= currentDate
          ? 0
          : subscriptionExpiration - currentDate,
      fine:
        returnDate < currentDate
          ? subscriptionExpiration <= currentDate
            ? 100
            : 50
          : 0,
    };
    return res.status(200).json({
      success: true,
      message: "Subscription detail for the user is: ",
      data
    });
}