import cron from "node-cron";
import { AttendenceModel } from "../Models/AttendenceSchema";
import { UserModel } from "../Models/UserSchema";
import { todayMidnight } from "./others";
import { sendAbsentEmail } from "./mailSender";
import { UserType } from "../types/types";
console.log("⏰cron connected successfully...");
// Run daily at 00:01 AM 1 0 * * *
cron.schedule("1 0 * * *", async () => {
  console.log("⏰ Running daily attendance cron...");

  try {
    const today = new Date();
    const yyyyMmDd = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    const allUsers = await UserModel.find({ isActive: 1, isDelete: 0 });

    for (const user of allUsers) {
      const alreadyMarked = await AttendenceModel.findOne({
        userId: user._id,
        date: yyyyMmDd,
      });

      if (!alreadyMarked) {
        await AttendenceModel.create({
          userId: user._id,
          date: yyyyMmDd,
          present: false,
          location: { lat: 0, lon: 0 },
        });
      }
    }

    console.log(
      "✅ Attendance marked as 'absent' for users who haven't logged in yet."
    );
  } catch (error) {
    console.error("❌ Error in attendance cron:", error);
  }
});
// one day absent
cron.schedule("0 17 * * *", async () => {
  console.log("⏰ Running scheduled task to check absent interns at 5 PM");

  try {
    const absentInterns = await AttendenceModel.find(
      {
        isDelete: 0,
        isActive: 1,
        createdAt: { $gte: todayMidnight }, // >= midnight today
        present: false,
      },
      "userId"
    );
    for (const entry of absentInterns) {
      const userId = entry.userId;
      const user: UserType | null = await UserModel.findById(userId);
      if (!user) {
        console.log("user not found ");
        continue;
      }

      setTimeout(
        async () =>
          await sendAbsentEmail(
            1,
            user.email,
            user.name,
            "Internship Attendance Alert – Action Needed for Today’s Absence"
          ),

        3000
      );

      console.log(`📧 Sent absent email to: ${user.email}`);
    }
  } catch (err) {
    console.error("❌ Error in absent intern cron:", err);
  }
});

// 15 days absent
cron.schedule("0 20 * * *", async () => {
  console.log(
    "⏰ Running scheduled task to check absent interns from last 15 days"
  );
  const fifteenDaysAgo = new Date();
  fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 1);

  try {
    const absentUserIds = await AttendenceModel.aggregate([
      {
        $match: {
          createdAt: { $gte: fifteenDaysAgo },
          isDelete: 0,
          isActive: 1,
        },
      },
      {
        $group: {
          _id: "$userId",
          presentDays: {
            $sum: {
              $cond: [{ $eq: ["$present", true] }, 1, 0],
            },
          },
        },
      },
      {
        $match: {
          presentDays: 0, // No present days in the last 15 days
        },
      },
      {
        $project: {
          _id: 0,
          userId: "$_id",
        },
      },
    ]);

    for (const entry of absentUserIds) {
      const userId = entry.userId;
      const user: UserType | null = await UserModel.findById(userId);
      if (!user) {
        console.log("user not found ");
        continue;
      }

      setTimeout(
        async () =>
          await sendAbsentEmail(
            2,
            user.email,
            user.name,
            "Action Required: 15+ Days of Unreported Absence"
          ),

        3000
      );

      console.log(`📧 Sent absent email to: ${user.email}`);
    }
  } catch (err) {
    console.error("❌ Error in absent intern cron:", err);
  }
});
