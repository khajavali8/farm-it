import Transaction from '../models/Transaction.js';
import Farm from '../models/Farm.js';  
import mongoose from 'mongoose';

const transactionController = {
  async getTransactions(req, res) {
    try {
      console.log("User ID:", req.user.id);
      const userId = new mongoose.Types.ObjectId(req.user.id);

      const transactions = await Transaction.find({
        $or: [{ from: userId }, { to: userId }] // Include both sent and received transactions
      })
        .populate("from", "firstName lastName email")
        .populate("to", "firstName lastName email");

      if (!transactions.length) {
        return res.status(404).json({ message: "No transactions found" });
      }

      res.json(transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      res.status(500).json({ message: "Server error" });
    }
  },



  async getAnalytics(req, res) {
    try {
      const userId = new mongoose.Types.ObjectId(req.user.id);

      const investments = await Transaction.aggregate([
        { $match: { from: userId, type: 'investment' } },
        { $group: { _id: { $month: "$date" }, totalAmount: { $sum: "$amount" } } },
        { $sort: { _id: 1 } }
      ]);

      const repayments = await Transaction.aggregate([
        { $match: { from: userId, type: 'repayment' } },
        { $group: { _id: { $month: "$date" }, totalAmount: { $sum: "$amount" } } },
        { $sort: { _id: 1 } }
      ]);

      res.json({ investments, repayments });
    } catch (error) {
      console.error("Error fetching analytics:", error);
      res.status(500).json({ message: "Server error" });
    }
  },

  async getTransactionDetails(req, res) {
    try {
      console.log("Transaction ID:", req.params.id);
  
      // Check if the ID is valid
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid Transaction ID" });
      }
  
      const transaction = await Transaction.findById(req.params.id)
        .populate("from", "firstName lastName email") // Fetch sender details
        .populate("to", "firstName lastName email")   // Fetch receiver details
        .populate({
          path: "loan",
          select: "amount interestRate duration status amountPaid repaymentSchedule"
        })
        .populate("farmId", "name location");
  
      if (!transaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }
  
      // Ensure updatedAt is correctly set
      const transactionData = transaction.toObject();
      transactionData.updatedAt = transaction.updatedAt || "Not Updated";
  
      res.json(transactionData);
    } catch (error) {
      console.error("Error fetching transaction details:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
  


};

export default transactionController;
