import { clerkClient, getAuth } from "@clerk/express";
import User from "../models/user.model.js";

export async function protectRoute(req, res, next) {
  try {
    const { userId } = getAuth(req);

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    let user = await User.findOne({ clerkId: userId });

    // If webhook hasn't synced the user yet (e.g. local development), fetch from Clerk and upsert
    if (!user) {
      try {
        const u = await clerkClient.users.getUser(userId);
        if (u) {
          const email =
            u.emailAddresses?.find((e) => e.id === u.primaryEmailAddressId)?.emailAddress ??
            u.emailAddresses?.[0]?.emailAddress;

          const fullName =
            [u.firstName, u.lastName].filter(Boolean).join(" ") ||
            u.username ||
            email?.split("@")[0] ||
            "User";

          user = await User.findOneAndUpdate(
            { clerkId: u.id },
            { clerkId: u.id, email, fullName, profilePic: u.imageUrl },
            { new: true, upsert: true, setDefaultsOnInsert: true },
          );
        }
      } catch (syncError) {
        console.error("Error auto-syncing Clerk user:", syncError.message);
      }
    }

    if (!user) {
      res.status(404).json({ message: "User profile is not synced yet" });
      return;
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("Error in protectRoute middleware:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}
