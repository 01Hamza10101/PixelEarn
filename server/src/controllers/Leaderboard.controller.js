import Wallet from "../models/wallet.model.js";
import User from "../models/user.model.js";

async function Leaderboard(req, res, next) {
    try {
        // Helper function to fetch top painters and their user info
        const getTopPainters = async (minPx, maxPx) => {
            const wallets = await Wallet.find({
                Pxbalance: { $gte: minPx, $lt: maxPx }
            }).sort({ Pxbalance: -1 }).limit(100);

            const userIds = wallets.map(wallet => wallet.UserId);
            const users = await User.find({ _id: { $in: userIds } });

            // Create a map for user names for easy lookup
            const userMap = {};
            users.forEach(user => {
                userMap[user._id] = user.Name; // Assuming user._id matches Wallet.UserId
            });

            // Combine wallet data with user names
            return wallets.map(wallet => ({
                UserId: wallet.UserId,
                Pxbalance: wallet.Pxbalance,
                Name: userMap[wallet.UserId] || "Unknown" // Fallback if name is not found
            }));
        };

        // Fetch top painters in each range
        const Leaderboard20k = await getTopPainters(0, 20001);
        const Leaderboard40k = await getTopPainters(20001, 40000);
        const Leaderboard60k = await getTopPainters(40000, 60000);
        const Leaderboard80k = await getTopPainters(60000, 80000);

        // Combine all painters into one array if needed
        const combinedPainters = [
            ...Leaderboard20k,
            ...Leaderboard40k,
            ...Leaderboard60k,
            ...Leaderboard80k
        ];

        // console.log(combinedPainters);
        res.status(200).json({
            data: {
                Leaderboard20k,
                Leaderboard40k,
                Leaderboard60k,
                Leaderboard80k
            },
            message: { msg: "Leaderboard received" }
        });
    } catch (error) {
        console.error(error); // Log the error
        res.status(500).json({ error: 'An error occurred while fetching the leaderboard.' });
    }
}

export default Leaderboard;
