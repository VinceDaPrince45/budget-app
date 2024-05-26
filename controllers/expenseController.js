const Expense = require("../models/expenses");
const SpendingCategory = require("../models/spendingCategories");
const Store = require("../models/stores");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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
    },"item_name price date_bought").sort({date_bought:1}).exec();

    return items;
  } catch (error) {
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
  const allExpenses = await Expense.find({}, "item_name date_bought price").sort({price:-1}).populate("store_bought").populate("categories").exec();
  res.render("layout",{
    title:"Expense List",
    expense_list: allExpenses
  })
});
  
// Display detail page for a specific expense.
exports.expense_detail = asyncHandler(async (req, res, next) => {
  const expense = await Expense.findById(req.params.id).populate("categories").populate("store_bought").exec();
  if (expense == null) {
    const err = new Error("Expense not found");
    err.status(404);
    return next(err);
  }
  res.render("layout",{
    title:"Expense Detail",
    expense:expense
  });
});

// Display expense create form on GET.
exports.expense_create_get = asyncHandler(async (req, res, next) => {
  const [allStores,allCategories] = await Promise.all([
    Store.find({}).sort({name:1}).exec(),
    SpendingCategory.find({}).sort({name:1}).exec()
  ]);
  res.render("layout",{
    title:"Create Expense",
    stores:allStores,
    categories:allCategories,
    expense:null,
    errors:null
  })
});

// Handle expense create on POST.
exports.expense_create_post = [
  // need to convert categories to array
  (req,res,next) => {
    if (!Array.isArray(req.body.categories)) {
      req.body.categories = typeof req.body.categories === "undefined" ? [] : [req.body.categories];
    }
    next();
  },
  // Validate
  body("item_name","Item name must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("store", "Store must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price","Price must not be empty")
    .trim()
    .escape(),
  body("description","Description must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("date", "Invalid date")
    .optional({ values: "falsy" })
    .isISO8601()
    .toDate(),
  body("categories.*").escape(),
  asyncHandler(async (req,res,next) => {
    const errors = validationResult(req);
    const expense = new Expense({
      item_name:req.body.item_name,
      date_bought:req.body.date,
      item_description:req.body.description,
      store_bought:req.body.store,
      categories:req.body.categories,
      price:req.body.price
    });
    if (!errors.isEmpty()) {
      const [allStores,allCategories] = await Promise.all([
        Store.find({}).sort({name:1}).exec(),
        SpendingCategory.find({}).sort({name:1}).exec()
      ]);
      for (const category in allCategories) {
        if (expense.categories.includes(category._id)) {
          category.checked = "true";
        }
      }
      res.render("layout", {
        title:"Create Expense",
        stores:allStores,
        categories:allCategories,
        expense:expense,
        errors:errors.array()
      });
    } else {
      await expense.save();
      res.redirect(expense.url);
    }
  })
];

// Display expense delete form on GET.
exports.expense_delete_get = asyncHandler(async (req, res, next) => {
  const expense = await Expense.findById(req.params.id).populate("store_bought").exec();
  res.render("layout", {
    title:"Delete Expense",
    expense:expense
  });
});

// Handle expense delete on POST.
exports.expense_delete_post = asyncHandler(async (req, res, next) => {
  await Expense.findByIdAndDelete(req.body.expense_id);
  res.redirect("/catalog/expenses");
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
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;

  if (startDate != null && endDate != null) {
    try {
      const items = await getItemsByDateRange(startDate, endDate);
      res.render('layout', {
        title: 'Expenses by Date', 
        expenses: items, 
        startDate:startDate,
        endDate:endDate
      });
    } catch (error) {
      next(error);
    }
  } else {
    res.render("layout",{
      title: "Expenses by Date",
      expenses: null,
      startDate: null,
      endDate:null
    });
  }
});

exports.expense_date_post = asyncHandler(async (req, res, next) => {
});