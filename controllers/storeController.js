const Store = require("../models/stores");
const asyncHandler = require("express-async-handler");

// Display list of all stores.
exports.store_list = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: store list");
  });
  
// Display detail page for a specific store.
exports.store_detail = asyncHandler(async (req, res, next) => {
res.send(`NOT IMPLEMENTED: store detail: ${req.params.id}`);
});

// Display store create form on GET.
exports.store_create_get = asyncHandler(async (req, res, next) => {
res.send("NOT IMPLEMENTED: store create GET");
});

// Handle store create on POST.
exports.store_create_post = asyncHandler(async (req, res, next) => {
res.send("NOT IMPLEMENTED: store create POST");
});

// Display store delete form on GET.
exports.store_delete_get = asyncHandler(async (req, res, next) => {
res.send("NOT IMPLEMENTED: store delete GET");
});

// Handle store delete on POST.
exports.store_delete_post = asyncHandler(async (req, res, next) => {
res.send("NOT IMPLEMENTED: store delete POST");
});

// Display store update form on GET.
exports.store_update_get = asyncHandler(async (req, res, next) => {
res.send("NOT IMPLEMENTED: store update GET");
});

// Handle store update on POST.
exports.store_update_post = asyncHandler(async (req, res, next) => {
res.send("NOT IMPLEMENTED: store update POST");
});