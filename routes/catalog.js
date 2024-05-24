var express = require('express');
var router = express.Router();

const expense_controller = require("../controllers/expenseController");
const spending_category_controller = require("../controllers/spendingCategoryController");
const store_controller = require("../controllers/storeController");

// expense routes

// home page
router.get('/', expense_controller.index);
// creating an expense
router.get("/expense/create",expense_controller.expense_create_get);
router.post("/expense/create",expense_controller.expense_create_post);
// deleting an expense
router.get("/expense/:id/delete",expense_controller.expense_delete_get);
router.post("/expense/:id/delete",expense_controller.expense_delete_post);
// updating expense
router.get("/expense/:id/update",expense_controller.expense_update_get);
router.post("/expense/:id/update",expense_controller.expense_update_post);
// one expense detail
router.get("/expense/:id",expense_controller.expense_detail);
// list of expenses
router.get("/expenses",expense_controller.expense_list);
// get expenses within period of time
router.get("/expenses/by-date",expense_controller.expense_date_get);
// router.get("/expenses/by-date",expense_controller.expense_date_post);

// creating an spending category
router.get("/spendingcategory/create",spending_category_controller.spending_category_create_get);
router.post("/spendingcategory/create",spending_category_controller.spending_category_create_post);
// deleting an spending category
router.get("/spendingcategory/:id/delete",spending_category_controller.spending_category_delete_get);
router.post("/spendingcategory/:id/delete",spending_category_controller.spending_category_delete_post);
// updating spending category
router.get("/spendingcategory/:id/update",spending_category_controller.spending_category_update_get);
router.post("/spendingcategory/:id/update",spending_category_controller.spending_category_update_post);
// one spending category detail
router.get("/spendingcategory/:id",spending_category_controller.spending_category_detail);
// list of spending category
router.get("/spendingcategories",spending_category_controller.spending_category_list);

// creating an store
router.get("/store/create",store_controller.store_create_get);
router.post("/store/create",store_controller.store_create_post);
// deleting an store
router.get("/store/:id/delete",store_controller.store_delete_get);
router.post("/store/:id/delete",store_controller.store_delete_post);
// updating store
router.get("/store/:id/update",store_controller.store_update_get);
router.post("/store/:id/update",store_controller.store_update_post);
// one store detail
router.get("/store/:id",store_controller.store_detail);
// list of stores
router.get("/stores",store_controller.store_list);

module.exports = router;
