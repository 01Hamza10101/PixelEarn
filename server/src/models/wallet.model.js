import mongoose from 'mongoose';

const WalletSchema = new mongoose.Schema({
  UserId: {
    type: String,
    required: true
  },
  Pxbalance: {
    type: Number,
    required: true,
    default:"0"
  },
  History: [{
    Date: {
      type: Date,
      default: Date.now
    },
    Pixel: {
      type: Number, 
      required: true
    },
    Cordinate: {
      X: {
        type: Number,
      },
      Y: {
        type: Number,
      }
    },
    type: {
      type: String, 
      required: true
    }
  }],
  Energy: {
    type: [Number],
    default: [9, 510] 
  },
  PaintRewardLvl: {
    type: Number,
    default: '0' 
  },
  RechargingSpeedLvl: {
    type: Number,
    default: '0' 
  },
  EnergyLimitLvl: {
    type: Number,
    default: '0'
  },
  InviteList: [{
    UserId: {
      type: String,
      required: true
    },
    Name: {
      type: String,
      required: true
    }
  }],
  TaskCompleted: [{
    type: String
  }]
});

const Wallet = mongoose.model('Wallet', WalletSchema);

export default Wallet;
