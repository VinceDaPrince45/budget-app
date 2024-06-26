const Store = require("../models/stores");
const Expense = require("../models/expenses");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Display list of all stores.
exports.store_list = asyncHandler(async (req, res, next) => {
  allStores = await Store.find({}).sort({name:1}).exec();
  res.render("layout",{
    title:"Stores List",
    store_list:allStores
  })
});
  
// Display detail page for a specific store.
exports.store_detail = asyncHandler(async (req, res, next) => {
  const [store,expensesFromStore] = await Promise.all([
    Store.findById(req.params.id),
    Expense.find({store_bought:req.params.id})
  ]);

  if (store == null) {
    const err = new Error("Expense not found");
    err.status(404);
    return next(err);
  }

  res.render("layout", {
    title:"Store Detail",
    store:store,
    expenses:expensesFromStore
  })
});

// Display store create form on GET.
exports.store_create_get = (req,res,next) => {
  res.render("layout", {
    title:"Create Store",
    store:null,
    errors:null
  });
}

// Handle store create on POST.
exports.store_create_post = [
  body("name","Store name must contain at least 3 characters")
    .trim()
    .isLength({min:3})
    .escape(),
  body("location")
    .trim()
    .escape(),
  asyncHandler(async (req,res,next) => {
    const errors = validationResult(req);
    const store = new Store({name:req.body.name,location:req.body.location});

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("layout", {
        title: "Create Store",
        store:store,
        errors: errors.array(),
      });
      return;
    } else {
      // Data from form is valid.
      // Check if store with same name already exists.
      const storeExists = await Store.findOne({ name: req.body.name })
        .collation({ locale: "en", strength: 2 })
        .exec();
      if (storeExists) {
        // store exists, redirect to its detail page.
        res.redirect(storeExists.url);
      } else {
        await store.save();
        // New store saved. Redirect to store detail page.
        res.redirect(store.url);
      }
    }
  })
];

// Display store delete form on GET.
exports.store_delete_get = asyncHandler(async (req, res, next) => {
  const [store,allExpensesFromStore] = await Promise.all([
    Store.findById(req.params.id).exec(),
    Expense.find({store_bought:req.params.id},"item_name price").exec()
  ]);

  if (store === null) {
    res.redirect("/catalog/stores");
  }
  res.render("layout", {
    title:"Delete Store",
    store:store,
    store_expenses:allExpensesFromStore
  })
});

// Handle store delete on POST.
exports.store_delete_post = asyncHandler(async (req, res, next) => {
  const [store,allExpensesFromStore] = await Promise.all([
    Store.findById(req.params.id).exec(),
    Expense.find({store_bought:req.params.id},"item_name price").exec()
  ]);

  if (allExpensesFromStore.length > 0) {
    res.render("layout",{
      title:"Delete Store",
      store:store,
      store_expenses:allExpensesFromStore
    });
    return;
  } else {
    await Store.findByIdAndDelete(req.body.store_id);
    res.redirect("/catalog/stores");
  }
});

// Display store update form on GET.
exports.store_update_get = asyncHandler(async (req, res, next) => {
  const store = await Store.findById(req.params.id).exec();

  if (store === null) {
    const err = new Error("Book not found");
    err.status = 404
    return next(err);
  }

  res.render("layout",{
    title:"Update Store",
    store:store,
    errors:null
  })
});

// Handle store update on POST.
exports.store_update_post = [
  body("name","Store name must contain at least 3 characters")
  .trim()
  .isLength({min:3})
  .escape(),
  body("location")
  .trim()
  .escape(),
  asyncHandler(async (req,res,next) => {
    const errors = validationResult(req);
    const store = new Store({name:req.body.name,location:req.body.location,_id:req.params.id});

    if (!errors.isEmpty()) {
      // There are errors. Render the form again with sanitized values/error messages.
      res.render("layout", {
        title: "Update Store",
        store:store,
        errors: errors.array(),
      });
      return;
    } else {
      const updatedStore = await Store.findByIdAndUpdate(req.params.id,store,{});
      res.redirect(updatedStore.url);
    }
  })
];