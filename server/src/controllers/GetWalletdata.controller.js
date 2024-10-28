import Wallet from "../models/wallet.model.js";

async function GetWalletdata(req, res, next) {
    try {
        let newWallet = await Wallet.findOne({ UserId: req.user._id }).select('-_id -__v');
        
        if (!newWallet) {
            return res.status(404).json({
                message: {
                    success: false,
                    msg: "Wallet not found",
                }
            });
        }

        // Remove `_id` field from each History item
        if (newWallet.History) {
            newWallet.History = JSON.parse(JSON.stringify(newWallet.History)).map(item => {
                delete item._id;
                return item;
            });
        }

        res.status(200).json({
            newWallet, 
            message: {
                success: true,
                msg: "Wallet data received",
            }
        });

    } catch (error) {
        // console.error("Error fetching wallet data:", error);
        res.status(500).json({
            message: {
                success: false,
                msg: "Internal server error",
            }
        });
    }
}

export default GetWalletdata;
