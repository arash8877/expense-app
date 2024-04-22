import { View, Text } from "react-native";
import ExpensesOutput from "../components/expenses/ExpensesOutput";

const RecentExpenses = () => {
  return <ExpensesOutput expensesPeriod='last 7 days'/>;
};

export default RecentExpenses;
