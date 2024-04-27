import axios from "axios";

const baseUrl =
  "https://react-native-expense-app-afc58-default-rtdb.europe-west1.firebasedatabase.app";

export const storeExpense = (expenseData) => {
  axios.post(`${baseUrl}/expenses.json`, expenseData);
};

export const getExpenses = async () => {
  try {
    const response = await axios.get(`${baseUrl}/expenses.json`);
    const expenses = [];
    console.log(response.data);

    for (const key in response.data) {
      const expenseObj = {
        id: key,
        amount: response.data[key].amount,
        date: new Date(response.data[key].date),
        description: response.data[key].description,
      };
      expenses.push(expenseObj);
    }
    return expenses;
  } catch (error) {
    console.log(error);
  }
};
