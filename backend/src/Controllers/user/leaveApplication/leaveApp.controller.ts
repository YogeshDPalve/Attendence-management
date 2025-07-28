import { Request, Response } from "express";
import { LeaveModel } from "../../../Models/LeaveSchema";
import { isValidObjectId, ObjectId } from "mongoose";
import {
  errorWithData,
  errorWithoutData,
  successWithData,
  successWithoutData,
} from "../../../Utils/apiResponce";
import { CreateLeaveType, GetQuery, LeaveType } from "../../../types/types";
type Query = {
  userId: ObjectId;
  isDelete: number;
  $or: any[];
  status?: 0 | 1 | 2;
};
export const getLeaveApplications = async (req: Request, res: Response) => {
  const { id, search = "", status, page = 1, limit = 10 }: GetQuery = req.body;
  try {
    let query: Query = {
      userId: id,
      isDelete: 0,
      $or: [
        { laeve_type: { $regex: search, $options: "i" } },
        { reason: { $regex: search, $options: "i" } },
        { remark: { $regex: search, $options: "i" } },
      ],
    };
    if (status) {
      query.status = status;
    }
    const [totalCount, data] = await Promise.all([
      LeaveModel.countDocuments(query),
      LeaveModel.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
    ]);

    return res.status(200).send(
      successWithData("Data get successfully", data, {
        currentPage: page,
        totalPages: Math.ceil(totalCount / limit),
        totalItems: totalCount,
        pageSize: limit,
      })
    );
  } catch (error) {
    return res.status(500).send(errorWithData("Internal server error", error));
  }
};
export const createLeaveApplications = async (req: Request, res: Response) => {
  const { id, reason, leave_type, trainerId }: CreateLeaveType = req.body;
  try {
    const leave = await LeaveModel.create({
      userId: id,
      reason,
      leave_type,
      trainerId,
    });
    return res
      .status(200)
      .send(
        successWithData("Your request for leave placed successfully", leave)
      );
  } catch (error) {
    console.log(error);
    return res.status(500).send(errorWithData("Internal server error", error));
  }
};
export const removeLeaveApplications = async (req: Request, res: Response) => {
  const { id }: { id: ObjectId } = req.body;
  if (!id || !isValidObjectId(id)) {
    return res
      .status(404)
      .send(errorWithoutData("Id not found or invalid mongo id"));
  }
  try {
    const leave: LeaveType = await LeaveModel.findOneAndUpdate(
      { _id: id, isDelete: 0 },
      {
        isDelete: 1,
        isActive: 0,
      }
    );
    if (!leave) {
      return res
        .status(404)
        .send(errorWithoutData("Your leave request not found"));
    }
    return res
      .status(200)
      .send(successWithoutData("Your request for leave deleted successfully"));
  } catch (error) {
    console.log(error);
    return res.status(500).send(errorWithData("Internal server error", error));
  }
};
