import Wallet from "../models/wallet.model.js";

async function ADDTaskComp(req, res, next) {
    console.log("work", req.body);

    // Validate that Task_ID is a string
    if (!req.body.Task_ID || typeof req.body.Task_ID !== 'string') {
        return res.status(400).json({ success: false, msg: "Task_ID is required and must be a string" });
    }

    try {
        let newWallet = await Wallet.findOneAndUpdate(
            { UserId: req.user._id },
            {
                $push: {
                    TaskCompleted: req.body.Task_ID  // Make sure this is a string
                }
            },
            { new: true }
        ).select('-_id -__v -UserId');  // Exclude unnecessary fields

        if (!newWallet) {
            console.error("Wallet not found for user:", req.user._id);
            res.status(400).json({ success: false, msg: "Wallet not found" });
        }

        console.log("Updated wallet:", newWallet);
        res.status(200).json({ message:{success: true , msg: "Updated Task"}, newWallet });

    } catch (error) {
        console.error("Error updating wallet:", error);
        res.status(500).json({ message:{success: false, msg: "Internal server error" }});
    }
}

export default ADDTaskComp;
