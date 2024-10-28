import mongoose from 'mongoose';

// Define the Task schema
const taskSchema = new mongoose.Schema({
  ID:{
    type:String,
    required:true
  },
  Title: {
    type: String,
    required: true
  },
  ImageUrl: {
    type: String,
    required: true
  },
  RewardPixel: {
    type: String,
    required: true
  },
  RewardTitle: {
    type: String,
    required: true
  },
  TaskUrl: {
    type: String,
    required: true
  },
  ExpireDate: {
    type: String,
    required: true
  }
});

// Define the Boost schema
const boostSchema = new mongoose.Schema({
  ImageUrl: {
    type: String,
    required: true
  },
  Rewardslvl: {
    type: [[String]], // Array of arrays of strings for reward levels
    required: true
  },
  Title: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true
  }
});

// Define the Admin schema
const AdminSchema = new mongoose.Schema({
  Tasks: [taskSchema], // Array of tasks
  Boosts: [boostSchema], // Array of boosts
  user: {
    type: String,
    required: true
  }
});

const Admin = mongoose.model('Admin', AdminSchema);
export default Admin;


// let data = {
//   "_id":{"$oid":"670b9b3edaeeb55028ce58ae"},
// "Tasks":[{
//   "Title":"Youtube Bonus",
//   "ImageUrl":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQBAMAAAB8P++eAAAAAXNSR0IArs4c6QAAABhQTFRFHCk/6cGp86xt4I5f1YNQq4VwlU8bUzwyVRbffwAAAJZJREFUeNrt1cENw0AIBdG04BZo4bcwLWwLlGDaj7KKkeVTZFAu3jk/gcSF12r1vKAVbsza4PYpaRk62HaiVegCDmoA8hoEY3ZsV0QVojONcC9DMPvKMdxbIDJDEaMPIkW4T9cEkWd1aNYOsWaI3YP7v+7od+Ge8JpLl4lRg5MmTFaAMwklK8HMpWQ1mEWyX+B6yqtVtTf2acUX1leb/QAAAABJRU5ErkJggg==",
//   "RewardPixel":"64",
//   "RewardTitle":"Get up to 64",
//   "TaskUrl":"https://www.youtube.com/watch?v=eX5xr2UBT50",
//   "ExpireDate":"2233334343434"}],
// "Boosts":[{
//   "ImageUrl":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQBAMAAAB8P++eAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAABJQTFRFJS5B/+2k/8ZA/6cA5HQArUkAuEjH0AAAAGRJREFUeNrt1TENAEEMA8FQCAVTMAVTCH8qL0V6Bltcka2ntuu6rjcbGqZgqIGhXCx0h4VuDQrd7eLgupa3INDqPwbGm7QOgH9ZR0KvA+GsI2GUQuE4xcKkAAhMGTG2d0zX9WYfl2Yb5cnsVocAAAAASUVORK5CYII=",
//   "Rewards":[["1","1.5"]],
//   "Title":"Paint Reward"}]
// }