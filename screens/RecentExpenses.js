import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import ExpensesOutput from "../components/expenses/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { getExpenses } from "../util/http";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import ErrorOverlay from "../components/ui/ErrorOverlay";

const RecentExpenses = () => {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const expenseCtx = useContext(ExpensesContext);
  // const [fetchExpenses, setFetchExpenses] = useState([]);

  useEffect(() => {
    async function receiveExpenses() {
      setIsFetching(true);
      try {
        const expenses = await getExpenses();
        expenseCtx.setExpenses(expenses);
      } catch (error) {
        setError("could not fetch expenses!");
      }
      setIsFetching(false);
    }
    receiveExpenses();
  }, []);


  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }

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
