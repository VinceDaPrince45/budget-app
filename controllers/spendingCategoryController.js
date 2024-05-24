const SpendingCategory = require("../models/spendingCategories");
const asyncHandler = require("express-async-handler");

// Display list of all spending_categorys.
exports.spending_category_list = asyncHandler(async (req, res, next) => {
    const allSpendingCategories = await SpendingCategory.find({}).sort({name:1}).exec();
    res.render("layout",{
      title:"Spending Categories List",
      spending_categories_list:allSpendingCategories
    });
  });
  
// Display detail page for a specific spending_category.
exports.spending_category_detail = asyncHandler(async (req, res, next) => {
res.send(`NOT IMPLEMENTED: spending_category detail: ${req.params.id}`);
});

// Display spending_category create form on GET.
exports.spending_category_create_get = asyncHandler(async (req, res, next) => {
res.send("NOT IMPLEMENTED: spending_category create GET");
});

// Handle spending_category create on POST.
exports.spending_category_create_post = asyncHandler(async (req, res, next) => {
res.send("NOT IMPLEMENTED: spending_category create POST");
});

// Display spending_category delete form on GET.
exports.spending_category_delete_get = asyncHandler(async (req, res, next) => {
res.send("NOT IMPLEMENTED: spending_category delete GET");
});

// Handle spending_category delete on POST.
exports.spending_category_delete_post = asyncHandler(async (req, res, next) => {
res.send("NOT IMPLEMENTED: spending_category delete POST");
});

// Display spending_category update form on GET.
exports.spending_category_update_get = asyncHandler(async (req, res, next) => {
res.send("NOT IMPLEMENTED: spending_category update GET");
});

// Handle spending_category update on POST.
exports.spending_category_update_post = asyncHandler(async (req, res, next) => {
res.send("NOT IMPLEMENTED: spending_category update POST");
});