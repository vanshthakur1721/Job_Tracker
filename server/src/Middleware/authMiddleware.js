
// import jwt from "jsonwebtoken";
// export const generateToken = (userId) => {
//   return jwt.sign(
//     { id: userId },
//     process.env.JWT_SECRET,
//     { expiresIn: process.env.JWT_EXPIRES_IN }
//   );
// };

// export const authMiddleware = async(req,res,next)=>{

// try{
//         const authHeader = req.headers?.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "No token, authorization denied" });
//     }

//     const token = authHeader.split(" ")[1]; 
//         const decoded = jwt.verify(token,process.env.JWT_SECRET);
//         req.user = decoded;
//         next();

//     }
//     catch(error){
//         console.log(error)
//         res.status(500).json({message:"something went wrong"})
//     }
// }
import jwt from "jsonwebtoken";
export const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};
export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers?.authorization;
    console.log("Authorization Header:", authHeader);  // 👈 log this

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1];
    console.log("Extracted Token:", token); // 👈 log token

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Payload:", decoded); // 👈 log decoded data

    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Error:", error.message); // 👈 more useful log
    res.status(500).json({ message: error.message });
  }
};
