const SpendingCategory = require("../models/spendingCategories");
const Expense = require("../models/expenses");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");


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
  const [spendingCategory,categoryExpenses] = await Promise.all([
    SpendingCategory.findById(req.params.id).exec(),
    Expense.find({categories:req.params.id},"item_name price date_bought").exec()
  ]);
  if (spendingCategory == null) {
    const err = new Error("Expense not found");
    err.status(404);
    return next(err);
  }
  res.render("layout",{
    title:"Spending Category Detail",
    spending_category:spendingCategory,
    expenses:categoryExpenses
  });
});

// Display spending_category create form on GET.
exports.spending_category_create_get = (req,res,next) => {
  res.render("layout", {
    title:"Create Spending Category",
    category:null,
    errors:null
  })
}

// Handle spending_category create on POST.
exports.spending_category_create_post = [
  body("name","Category name must contain at least 3 characters")
    .trim()
    .isLength({min:3})
    .escape(),
  asyncHandler(async (req,res,next) => {
    const errors = validationResult(req);
    const category = new SpendingCategory({name:req.body.name});
    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("layout", {
        title: "Create Spending Category",
        category:category,
        errors: errors.array(),
      });
      return;
    } else {
      const categoryExists = await SpendingCategory.findOne({ name: req.body.name })
        .collation({ locale: "en", strength: 2 })
        .exec();
      if (categoryExists) {
        res.redirect(categoryExists.url);
      } else {
        await category.save();
        res.redirect(category.url);
      }
    }
  })
];

// Display spending_category delete form on GET.
exports.spending_category_delete_get = asyncHandler(async (req, res, next) => {
  const [category,categoryExpenses] = await Promise.all([
    SpendingCategory.findById(req.params.id).exec(),
    Expense.find({categories:req.params.id},"item_name price").exec()
  ]);
  if (category === null) {
    res.redirect("/catalog/spendingcategories");
  }
  res.render("layout", {
    title:"Delete Spending Category",
    category:category,
    category_expenses:categoryExpenses
  });
});

// Handle spending_category delete on POST.
exports.spending_category_delete_post = asyncHandler(async (req, res, next) => {
  const [category,categoryExpenses] = await Promise.all([
    SpendingCategory.findById(req.params.id).exec(),
    Expense.find({categories:req.params.id},"item_name price").exec()
  ]);
  if (categoryExpenses.length > 0) {
    res.render("layout", {
      title:"Delete Spending Category",
      category:category,
      category_expenses:categoryExpenses
    });
    return;
  } else {
    await SpendingCategory.findByIdAndDelete(req.body.category_id);
    res.redirect("/catalog/spendingcategories");
  }
});

// Display spending_category update form on GET.
exports.spending_category_update_get = asyncHandler(async (req, res, next) => {
res.send("NOT IMPLEMENTED: spending_category update GET");
});

// Handle spending_category update on POST.
exports.spending_category_update_post = asyncHandler(async (req, res, next) => {
res.send("NOT IMPLEMENTED: spending_category update POST");
});