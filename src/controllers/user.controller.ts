import { User, IUser, Profile } from "@/models/user";
import { AuthenticatedRequest } from "@/types/common";
import { Request, Response } from "express";
import mongoose from "mongoose";

const createUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const {
      fullName,
      email,
      mobile,
      roleId,
      password,
      departmentId,
      designationId,
      isStaff,
    } = req.body as IUser;

    const isAlreadyExist = await User.findOne({ $or: [{ email }, { mobile }] });
    if (isAlreadyExist) {
      res.status(403).json({ message: "Already Exist", status: false });
      return;
    }

    await User.create({
      fullName,
      email,
      mobile,
      roleId,
      password,
      departmentId,
      designationId,
      isStaff: isStaff || false,
      createdBy: req.id,
    });
    res.status(200).json({ message: "success", status: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error create", status: false });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      fullName,
      email,
      mobile,
      roleId,
      password,
      departmentId,
      designationId,
      isStaff,
    } = req.body;

    const data = await User.findById(id);
    if (!data) {
      res.status(401).json({ message: "No Data FOund", status: false });
      return;
    }
    await data.updateOne({
      fullName,
      email,
      mobile,
      roleId,
      password,
      departmentId,
      designationId,
      isStaff,
    });
    res
      .status(200)
      .json({ message: "updated successfully", status: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Update", status: false });
  }
};

const updateProfile = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.id;
    const { gender, dob } = req.body;
    const data = await User.findById({ _id: userId });
    if (!data) {
      res.status(401).json({ message: "No Data FOund", status: false });
      return;
    }

    if (!data.profileId) {
      const profileData = await Profile.create({
        gender,
        dob,
        userId: data._id,
      });

      await data.updateOne({
        profileId: profileData._id,
      });
      const updatedUser = await User.findById(userId).populate("profileId");

      res.status(200).json({
        message: "updated successfully",
        data: updatedUser,
        status: true,
      });
      return;
    } else {
      const myProfile = await Profile.findById({ _id: data.profileId });
      await myProfile?.updateOne({
        gender,
        dob,
      });

      res.status(200).json({
        message: "updated successfully",
        status: true,
      });
    }

    // if (!profileData) {
    //   res
    //     .status(400)
    //     .json({ message: "Profile Data Not Created", status: false, data });
    // }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Update", status: false });
  }
};

const findAllUser = async (req: Request, res: Response) => {
  try {
    const data = await User.find()
      .select("_id fullName email mobile isActive isStaff createdAt updatedAt")
      .populate("roleId", "_id name role")
      .populate("profileId");
    const count = await User.countDocuments();
    res.status(200).json({ message: "success", status: true, count, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Find All", status: false });
  }
};

const findOneUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = await User.findById(id)
      .populate("roleId")
      .populate("profileId");
    if (!data) {
      res.status(401).json({ message: "No Data FOund", status: false });
      return;
    }
    res.status(200).json({ message: "success", status: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Find one", status: false });
  }
};

export { createUser, updateUser, findAllUser, findOneUser, updateProfile };
