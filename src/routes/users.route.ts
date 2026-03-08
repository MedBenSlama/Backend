import {Router} from "express";
import {createUser, getAllUsers,getUser} from "../controllers/user.controller"; 
const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUser);
router.post("/", createUser);
export default router;
