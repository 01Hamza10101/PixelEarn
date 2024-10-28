import Wallet from "../models/wallet.model.js";
import ADDHistory from "./AddHistory.controller.js";

async function PaintPixel(req, res, next) {
    console.log("wroking")
    try {
        const userId = req.body.userId;  
        
        const updatedWallet = await Wallet.findOneAndUpdate(
            { UserId: req.user._id }, 
            { 
                $inc: {Pxbalance:req.body.Pixel}
            },
            { new: true }
        );

        if (updatedWallet) {
            await ADDHistory({_id:req.user._id,Pixel:req.body.Pixel,type:"Claim",XY:req.body.XY});
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

export default PaintPixel;
