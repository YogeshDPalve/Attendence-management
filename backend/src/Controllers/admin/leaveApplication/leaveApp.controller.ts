import { Request, Response } from "express";
import { LeaveModel } from "../../../Models/LeaveSchema";
import { isValidObjectId, ObjectId } from "mongoose";
import {
  errorWithData,
  errorWithoutData,
  successWithData,
  successWithoutData,
} from "../../../Utils/apiResponce";
import { GetQuery, LeaveType } from "../../../types/types";
import { sendEmail } from "../../../Utils/mailSender";

export const getSingleLeaveApplications = async (
  req: Request,
  res: Response
) => {
  const { id } = req.query || {};
  if (!id || !isValidObjectId(id)) {
    return res
      .status(404)
      .send(errorWithoutData("Id not found or invalid mongo id"));
  }
  try {
    const data = await LeaveModel.findById(id)
      .select("userId reason status leaveType createdAt updatedAt")
      .populate("userId", "name email phoneNumber");

    if (!data) {
      return res.status(404).send(errorWithoutData("Leave requst not found"));
    }
    return res.status(200).send(successWithData("Data get successfully", data));
  } catch (error) {
    return res.status(500).send(errorWithData("Internal server error", error));
  }
};
export const getLeaveApplications = async (req: Request, res: Response) => {
  const {
    search = "",
    status,
    page = 1,
    limit = 10,
    fromDate,
    toDate,
  }: GetQuery = req.body || {};

  try {
    const matchQuery: any = { isDelete: 0 };
    if (status) matchQuery.status = status;

    if (fromDate || toDate) {
      matchQuery.createdAt = {};
      if (fromDate) matchQuery.createdAt.$gte = new Date(`${fromDate} 00:00`);
      if (toDate) matchQuery.createdAt.$lte = new Date(`${toDate} 23:59`);
    }

    const searchRegex = new RegExp(search, "i");

    const basePipeline = [
      { $match: matchQuery },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
    ];

    if (search.trim()) {
      basePipeline.push({
        $match: {
          $or: [
            { leaveType: searchRegex },
            { reason: searchRegex },
            { "user.name": searchRegex },
            { "user.email": searchRegex },
            { "user.phoneNumber": searchRegex },
          ],
        },
      });
    }

    const dataPipeline: any = [
      ...basePipeline,
      { $sort: { createdAt: -1 } },
      { $skip: (page - 1) * limit },
      { $limit: limit },
      {
        $project: {
          userId: "$user._id",
          name: "$user.name",
          email: "$user.email",
          phoneNumber: "$user.phoneNumber",
          reason: 1,
          status: 1,
          leaveType: 1,
          createdAt: 1,
        },
      },
    ];

    const countPipeline = [...basePipeline, { $count: "total" }];

    const [data, countRes] = await Promise.all([
      LeaveModel.aggregate(dataPipeline),
      LeaveModel.aggregate(countPipeline),
    ]);

    const totalCount = countRes[0]?.total || 0;

    return res.status(200).send(
      successWithData("Data fetched successfully", data, {
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
export const updateLeaveApplications = async (req: Request, res: Response) => {
  const {
    id,
    status,
    remark,
  }: { id: ObjectId; status: 0 | 1; remark: string } = req.body;
  try {
    const leave = await LeaveModel.findByIdAndUpdate(id, {
      status,
      remark,
    })
      .select("userId reason status leave_type createdAt updatedAt remark")
      .populate({ path: "userId", select: "email name" });
    if (!leave) {
      return res.status(404).send(errorWithoutData("Leave request not found"));
    }
    const { name, email } = leave.userId as any;
    return await sendEmail("intern", email, name, status, remark, res);
  } catch (error) {
    console.log(error);
    return res.status(500).send(errorWithData("Internal server error", error));
  }
};
