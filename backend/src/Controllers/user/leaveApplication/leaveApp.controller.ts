import { Request, Response } from "express";
import { LeaveModel } from "../../../Models/LeaveSchema";
import { ObjectId } from "mongoose";
import {
  errorWithData,
  successWithData,
  successWithoutData,
} from "../../../Utils/apiResponce";
import { CreateLeaveType, GetQuery } from "../../../types/types";
type Query = {
  userId: ObjectId;
  isDelete: number;
  $or: any[];
  status?: 0 | 1 | 2;
};
export const getLeaveApplications = async (req: Request, res: Response) => {
  const { id, search = "", filter, page = 1, limit = 10 }: GetQuery = req.body;
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
    if (filter) {
      query.status = filter;
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
    await LeaveModel.create({
      userId: id,
      reason,
      leave_type,
      trainerId,
    });
    return res
      .status(200)
      .send(successWithoutData("Your request for leave placed successfully"));
  } catch (error) {
    console.log(error);
    return res.status(500).send(errorWithData("Internal server error", error));
  }
};
export const removeLeaveApplications = async (req: Request, res: Response) => {
  const { id }: { id: ObjectId } = req.body;
  try {
    await LeaveModel.findByIdAndUpdate(id, { isDelete: 1, isActive: 0 });
    return res
      .status(200)
      .send(successWithoutData("Your request for leave deleted successfully"));
  } catch (error) {
    console.log(error);
    return res.status(500).send(errorWithData("Internal server error", error));
  }
};
