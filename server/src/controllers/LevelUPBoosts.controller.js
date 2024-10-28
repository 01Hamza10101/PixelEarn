import Wallet from "../models/wallet.model.js";

async function LevelUPBoosts(req, res, next) {
    console.log(req.user);
    try {
        const userId = req.body.userId;  
        let updateField = {};

        // Conditional logic to determine which field to increment
        if (req.body.type === "Paint Reward") {
            updateField = { PaintRewardLvl: +1 ,Pxbalance: - req.body.levelUpAmount};
        } else if (req.body.type === "Recharging Speed") {
            updateField = { RechargingSpeedLvl: +1 ,Pxbalance: - req.body.levelUpAmount};
        } else if (req.body.type === "Energy Limit") {
            updateField = { EnergyLimitLvl: +1 ,Pxbalance: - req.body.levelUpAmount};
        }
        console.log(updateField);
        // Up
        const updatedWallet = await Wallet.findOneAndUpdate(
            { UserId: req.user._id }, 
            { 
                $inc: updateField
            },
            { new: true }
        );

        if (updatedWallet) {
            res.status(200).json({
                updatedWallet,
                message: { msg: "Wallet levels updated successfully" }
            });
        } else {
            res.status(404).json({ message: { msg: "Wallet not found" } });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: { msg: "Server error" } });
    }
}

export default LevelUPBoosts;
