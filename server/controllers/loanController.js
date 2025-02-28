import Loan from "../models/Loan.js";
import Transaction from "../models/Transaction.js";
import Farm from "../models/Farm.js";
import mongoose from "mongoose";

function generateRepaymentSchedule(amount, interestRate, duration) {
  const monthlyInterest = interestRate / 12 / 100;
  const monthlyPayment =
    (amount * monthlyInterest * Math.pow(1 + monthlyInterest, duration)) /
    (Math.pow(1 + monthlyInterest, duration) - 1);

  const schedule = [];
  let remainingBalance = amount;

  for (let i = 1; i <= duration; i++) {
    const interest = remainingBalance * monthlyInterest;
    const principal = monthlyPayment - interest;
    remainingBalance -= principal;

    schedule.push({
      dueDate: new Date(Date.now() + i * 30 * 24 * 60 * 60 * 1000),
      amount: monthlyPayment,
      status: "pending",
    });
  }

  return schedule;
}

const loanController = {
  /**
   * Create a new loan
   */
  async createLoan(req, res) {
    try {
      const { amount, interestRate, duration, farm } = req.body;

      const loan = await Loan.create({
        ...req.body,
        repaymentSchedule: generateRepaymentSchedule(amount, interestRate, duration),
      });

      res.status(201).json(loan);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  /**
   * Repay a loan
   */
  async repayLoan(req, res) {
    try {
      const { amount } = req.body;
      const { id } = req.params; 
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Loan ID" });
      }
  
      const loan = await Loan.findById(id);
  
      if (!loan) {
        return res.status(404).json({ message: "Loan not found" });
      }
  
      let newAmountPaid = amount;
      const totalAmount = loan.amount + (loan.amount * loan.interestRate) / 100;
  
      loan.amountPaid += newAmountPaid;
  
      for (let payment of loan.repaymentSchedule) {
        if (payment.status === "pending" && newAmountPaid >= payment.amount) {
          payment.status = "paid";
          newAmountPaid -= payment.amount;
        }
      }
  
      if (loan.amountPaid >= totalAmount) {
        loan.status = "completed";
      }
  
      await loan.save();
  
      const transaction = await Transaction.create({
        loan: loan._id,
        from: req.user.id,
        to: loan.investors.length > 0 ? loan.investors[0].investor : null,
        amount,
        type: "repayment",
        date: new Date(),
      });
  
      res.status(200).json({ message: "Loan repaid successfully", loan, transaction });
    } catch (error) {
      console.error("Repay loan error:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },


  /**
   * Get repayment schedule for a loan
   */
  async getRepaymentSchedule(req, res) {
    try {
      const loanId = req.params.id;

      if (!mongoose.Types.ObjectId.isValid(loanId)) {
        return res.status(400).json({ message: "Invalid Loan ID" });
      }

      const loan = await Loan.findById(loanId);
      if (!loan) {
        return res.status(404).json({ message: "Loan not found" });
      }
      res.json(loan.repaymentSchedule);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
  
  

  /**
   * Get all loans for the logged-in user
   */
/**
 * Get all loans for the logged-in user
 */
async getMyLoans(req, res) {
  try {
    // Find farms owned by the logged-in user
    const userFarms = await Farm.find({ farmer: req.user.id }).select('_id');
    
    // Extract farm IDs from the userFarms array
    const farmIds = userFarms.map(farm => farm._id);

    // Find loans that belong to the user's farms and populate the investors.investor field
    const loans = await Loan.find({ farm: { $in: farmIds } })
      .populate({
        path: 'investors.investor',
        select: 'name email', // Select the fields you want to populate
      });

    res.json(loans);
  } catch (error) {
    console.error("Error fetching my loans:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
},
  /**
   * Get all investments made by the logged-in user
   */
  async getMyInvestments(req, res) {
    try {
        const investments = await Transaction.find({ from: req.user.id, type: "investment" })
            .populate({
                path: "farmId",
                select: "name location description farmType",
            })
            .populate({
                path: "loan",
                select: "amount interestRate duration status",
            });

        if (!investments.length) {
            return res.status(404).json({ message: "No investments found" });
        }

        res.json(investments);
    } catch (error) {
        console.error("Error fetching investments:", error);
        res.status(500).json({ message: "Server error" });
    }
},


  /**
   * Get all available loans for investment
   */
  async getAvailableLoans(req, res) {
    try {
      const loans = await Loan.find({ status: "pending" }).populate("farm", "name location");
      res.json(loans);
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },

  /**
   * Invest in a loan
   */
  async investInLoan(req, res) {
    try {
      const { amount } = req.body;
      const loan = await Loan.findById(req.params.id).populate("farm");

      if (!loan) {
        return res.status(404).json({ message: "Loan not found" });
      }

      // Add investor to the loan
      loan.investors.push({
        investor: req.user.id,
        amount,
        date: new Date(),
      });

      await loan.save();

      // Store investment history in transactions
      const transaction = await Transaction.create({
        loan: loan._id,
        from: req.user.id, // Investor
        to: loan.farm, // Associated Farm
        amount: amount,
        type: "investment",
        date: new Date(),
      });

      res.json({
        message: "Investment successful",
        loan,
        transaction,
      });
    } catch (error) {
      console.error("Invest in loan error:", error);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  },
};

export default loanController;
