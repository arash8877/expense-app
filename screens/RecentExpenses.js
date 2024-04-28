import { useEffect } from "react";
import { View, Text } from "react-native";
import ExpensesOutput from "../components/expenses/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { getExpenses } from "../util/http";

const RecentExpenses = () => {
  const expenseCtx = useContext(ExpensesContext);
  // const [fetchExpenses, setFetchExpenses] = useState([]);

  useEffect(() => {
    async function receiveExpenses() {
      const expenses = await getExpenses();
      // setFetchExpenses(expenses);
      expenseCtx.setExpenses(expenses);
    }
    receiveExpenses();
  }, []);

  const recentExpenses = expenseCtx.expenses.filter((expense) => {
    const today = new Date();
    const past7Days = getDateMinusDays(today, 7);
    return expense.date > past7Days;
  });
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="last 7 days"
      fallbackText="No expenses registered for the last 7 days."
    />
  );
};

export default RecentExpenses;
