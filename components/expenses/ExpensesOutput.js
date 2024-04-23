import { View, StyleSheet } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 49.99,
        date: new Date('2022-12-19')
    },
    {
        id: 'e2',
        description: 'restaurant',
        amount: 59.99,
        date: new Date('2023-01-23')
    },
    {
        id: 'e3',
        description: 'Gaming',
        amount: 15.99,
        date: new Date('2023-10-19')
    },
    {
        id: 'e4',
        description: 'book',
        amount: 12.99,
        date: new Date('2023-12-19')
    },
    {
        id: 'e5',
        description: 'Shirt',
        amount: 41.99,
        date: new Date('2024-01-15')
    },
]

const ExpensesOutput = ({ expenses, expensesPeriod }) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriod}/>
      <ExpensesList expenses={DUMMY_EXPENSES}/>
    </View>
  );
};

export default ExpensesOutput;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizental: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
})
