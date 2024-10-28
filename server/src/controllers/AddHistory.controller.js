import Wallet from "../models/wallet.model.js";

const formatDate = (date) => {
    const options = {
        day: '2-digit',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
    };
    return new Intl.DateTimeFormat('en-GB', options).format(date).replace(',', ' at');
};

async function ADDHistory(data) {
    console.log("work", data);
    try {
        let newWallet = await Wallet.findOneAndUpdate(
            { UserId: data._id },
            {
                $push: {
                    History: {
                        type: data.type,
                        Date: new Date(),
                        Pixel: parseFloat(data.Pixel),
                        Cordinate:data.XY
                    }
                }
            },
            { new: true }
        ).select('-_id -__v -UserId');

        if (!newWallet) {
            console.error("Wallet not found for user:", data._id);
            return { success: false, msg: "Wallet not found" };
        }

        console.log("Updated wallet:", newWallet);
        return { success: true, newWallet };

    } catch (error) {
        console.error("Error updating wallet:", error);
        return { success: false, msg: "Internal server error" };
    }
}

export default ADDHistory;
