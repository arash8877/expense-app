import { useLayoutEffect } from "react";
import { View, Text } from "react-native";

const ManageExpense = ({ route, navigation }) => {
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId; //Convert expenseId to boolean

  useLayoutEffect(() => {
    navigation.setOptions({
      //updating of options of a screen inside a screen: navigation.setOptions()
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  return <Text>Manage Expense screen</Text>;
};

export default ManageExpense;
