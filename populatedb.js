#! /usr/bin/env node

console.log(
    'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Expense = require("./models/expenses");
const SpendingCategory = require("./models/spendingCategories");
const Store = require("./models/stores");

const expenses = []
const spending_categories = []
const stores = []

const mongoose = require("mongoose");
mongoose.set("strictQuery",false);

const mongoDB = userArgs[0];

main().catch((err)=>console.log(err));

async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createSpendingCategories();
    await createStores();
    await createExpenses();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}

async function expenseCreate(index,name,date,description,store,categories,price) {
const expenseDetails = {item_name:name,price:price,item_description:description,store_bought:store};
if (date != false) {
    expenseDetails.date_bought = date
}
if (categories != false) {
    expenseDetails.categories = categories
}
const newExpense = new Expense(expenseDetails);
await newExpense.save();
expenses[index] = newExpense;
console.log(`Added expense: ${name}`);
}

async function spendingCategoryCreate(index,name) {
const newSpendingCategory = new SpendingCategory({name:name});
await newSpendingCategory.save();
spending_categories[index] = newSpendingCategory;
console.log(`Added spending category: ${name}`);
}

async function storeCreate(index,name,location) {
const newStore = new Store({name:name,location:location});
await newStore.save();
stores[index] = newStore;
console.log(`Added store: ${name}`);
}

async function createExpenses() {
console.log("Adding expenses");
await Promise.all([
    expenseCreate(
        0,
        "Netflix",
        "2024-08-09",
        "Netflix subscription for movies",
        stores[0],
        [spending_categories[1]],
        8
    ),
    expenseCreate(
        1,
        "Groceries",
        "2023-01-18",
        "Food for the week",
        stores[2],
        [spending_categories[0]],
        200
    ),
    expenseCreate(
        2,
        "Vacation to Hawaii",
        "2023-3-15",
        "AirBNB and food",
        stores[0],
        [spending_categories[0],spending_categories[2],spending_categories[3]],
        1500
    ),
    expenseCreate(
        3,
        "Rent",
        "2024-05-01",
        "Monthly Rent",
        stores[3],
        [spending_categories[2]],
        450
    ),
]);
}

async function createSpendingCategories() {
console.log("Adding spending categories");
await Promise.all([
    spendingCategoryCreate(0,"Food"),
    spendingCategoryCreate(1,"Entertainment"),
    spendingCategoryCreate(2,"Housing"),
    spendingCategoryCreate(3,"Travel")
]);
}

async function createStores() {
console.log("Adding stores");
await Promise.all([
    storeCreate(0,"Online",null),
    storeCreate(1,"Walmart","Houston"),
    storeCreate(2,"HEB","Houston"),
    storeCreate(3,"Blank Apartments", "College Station"),
]);
}