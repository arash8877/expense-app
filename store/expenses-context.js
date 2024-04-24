import { createContext, useReducer } from "react";
const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 49.99,
    date: new Date("2022-12-19"),
  },
  {
    id: "e2",
    description: "restaurant",
    amount: 59.99,
    date: new Date("2023-01-23"),
  },
  {
    id: "e3",
    description: "Gaming",
    amount: 15.99,
    date: new Date("2023-10-19"),
  },
  {
    id: "e4",
    description: "book",
    amount: 12.99,
    date: new Date("2023-12-19"),
  },
  {
    id: "e5",
    description: "Shirt",
    amount: 41.99,
    date: new Date("2024-01-15"),
  },
  {
    id: "e6",
    description: "computer",
    amount: 12.199,
    date: new Date("2024-04-20"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

function expenseReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
        return state.filter((expense)=> expense.id !== action.payload)
    default:
      return state;
  }
}

export const ExpensesContextProvider = ({ children }) => {
  const [expenseState, dispatch] = useReducer(expenseReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expenseState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense
  }

  return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
};
