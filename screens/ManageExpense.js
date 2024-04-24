import { View, Text } from "react-native";

const ManageExpense = ({route}) => {
  const editedExpenseId = route.params.expenseId;
  
  return (
    <Text>Manage Expense screen</Text>
  )
}

export default ManageExpense;