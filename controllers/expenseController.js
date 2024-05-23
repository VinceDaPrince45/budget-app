const Expense = require("../models/expenses");
const asyncHandler = require("express-async-handler");

// home page
exports.index = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Site Home Page");
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