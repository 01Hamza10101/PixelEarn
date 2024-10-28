import admin from '../models/admin.model.js';

async function TaskBoosts(req,res,next) {
    try {
        let data = await admin.findOne({ user: "admin" }).select('-_id -__v -user');
        if (data) {
            // console.log("Result:", res);
            res.status(200).json({data,message:{msg:"Data retrieved successfully"}})
        } else {
            console.log("No admin document found");
        }
    } catch (error) {
        console.error("Error fetching admin document:", error);
    }
}

export default TaskBoosts;
