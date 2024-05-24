const Expense = require("../models/expenses");
const SpendingCategory = require("../models/spendingCategories");
const Store = require("../models/stores");
const asyncHandler = require("express-async-handler");

// Function to sum up all prices in the expenses schema
const sumAllPrices = async () => {
    try {
      // Perform an aggregation on the Expense collection
      const result = await Expense.aggregate([
        {
          $group: {
            _id: null, // Use null to group all documents together
            totalPrice: { $sum: "$price" } // Sum the values of the 'price' field
          }
        }
      ]);
  
      if (result.length > 0) {
        // Log the total price of all expenses
        return result[0].totalPrice; // Return the total price
      } else {
        return 0;
      }
    } catch (error) {
      throw error;
    }
};

const getItemsByDateRange = async (startDate, endDate) => {
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
  
      const items = await Expense.find({
        date_bought: {
          $gte: start,
          $lte: end
        }
      });
  
      return items;
    } catch (error) {
      console.error('Error fetching items by date range:', error);
      throw error;
    }
  };  

// home page
exports.index = asyncHandler(async (req, res, next) => {
    const [
        numExpenses,
        numSpendingCategories,
        numStores,
        totalSpent
    ] = await Promise.all([
        Expense.countDocuments({}).exec(),
        SpendingCategory.countDocuments({}).exec(),
        Store.countDocuments({}).exec(),
        sumAllPrices()
    ]);
    res.render("layout",{
        title:"Home",
        expense_count:numExpenses,
        spending_category_count:numSpendingCategories,
        store_count:numStores,
        total_spent:totalSpent
    })
});

// Display list of all expenses.
exports.expense_list = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: expense list");
});
  
// Display detail page for a specific expense.
exports.expense_detail = asyncHandler(async (req, res, next) => {
res.send(`NOT IMPLEMENTED: expense detail: ${req.params.id}`);
});

// Display expense create form on GET.
exports.expense_create_get = asyncHandler(async (req, res, next) => {
res.send("NOT IMPLEMENTED: expense create GET");
});

// Handle expense create on POST.
exports.expense_create_post = asyncHandler(async (req, res, next) => {
res.send("NOT IMPLEMENTED: expense create POST");
});

// Display expense delete form on GET.
exports.expense_delete_get = asyncHandler(async (req, res, next) => {
res.send("NOT IMPLEMENTED: expense delete GET");
});

// Handle expense delete on POST.
exports.expense_delete_post = asyncHandler(async (req, res, next) => {
res.send("NOT IMPLEMENTED: expense delete POST");
});

// Display expense update form on GET.
exports.expense_update_get = asyncHandler(async (req, res, next) => {
res.send("NOT IMPLEMENTED: expense update GET");
});

// Handle expense update on POST.
exports.expense_update_post = asyncHandler(async (req, res, next) => {
res.send("NOT IMPLEMENTED: expense update POST");
});

exports.expense_date_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: expense date get");
});

exports.expense_date_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: expense date post");
});