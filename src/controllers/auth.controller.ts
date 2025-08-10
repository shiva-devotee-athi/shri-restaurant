import { createjwt } from "@/functions/createjwt";
import { IRole, Role } from "@/models/role";
import { User } from "@/models/user";
import { Request, Response } from "express";

const register = async (req: Request, res: Response) => {
  try {
    const { fullName, email, mobile, password } = req.body;

    const roleData = await Role.findOne({ role: "CUSTOMER" });

    if (!roleData) {
      res.status(400).json({ message: "Role Id Missing", status: true });
      return;
    }

    User.findOne({ $or: [{ email }, { mobile }] }).then((data) => {
      if (data) {
        res.status(400).json({ message: "User Already Exist", status: true });
      } else {
        const newUser = new User({
          fullName,
          email,
          mobile,
          password,
          roleId: roleData._id,
        });
        newUser.save().then((data) => {
          res
            .status(201)
            .json({ message: "Create user Successfully", status: true });
        });
      }
    });

    //   newUser.save().then((data) => {
    //     res
    //       .status(201)
    //       .json({ message: "Create user Successfully", status: true });
    //   });
  } catch (error) {
    console.error("Error Happens While Register", error);
    res
      .status(500)
      .json({ message: "Error Happens While Register", status: false });
  }
};

const login = (req: Request, res: Response) => {
  try {
    const { mobile, password } = req.body;
    User.findOne({ mobile })
      .populate<{ roleId: IRole }>("roleId")
      .then(async (data) => {
        if (data) {
          const isMatch = await data.verifyPassword(req.body.password);
          if (!isMatch) {
            res
              .status(401)
              .json({ error: "Invalid credentials", status: false });
            return;
          }

          const { fullName, _id, email, mobile, roleId } = data;
          const roleName: string = roleId.role;
          const token = createjwt({
            id: _id.toString(),
            fullName,
            email,
            mobile,
            role: roleName,
          });
          res
            .status(200)
            .json({ message: "Logged in successfully", token, status: true });
        } else {
          res
            .status(200)
            .json({ message: "User Not Found Please Register", status: false });
        }
      });
  } catch (error) {
    console.error("Error Happens While Login", error);
    res
      .status(500)
      .json({ message: "Error Happens While Login", status: false });
  }
};

export { register, login };
