import { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Input from "./Input";
import Button from "../ui/Button";

const ExpenseForm = ({ onCancel, onSubmit, submitButtonLabel, defaultValues }) => {
  const [input, setInput] = useState({
    amount: {value: defaultValues ? defaultValues.amount.toString() : '',
    isValid: true,
  },
    date: {value: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : '',
    isValid: true,
  },
    description: {value: defaultValues? defaultValues.description : '',
    isValid: true,
  } ,
  });

  const inputChangeHandler = (inputIdentifier, enteredValue) => {
    setInput((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]: {value: enteredValue, isValid: true},
      };
    });
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +input.amount.value, //using + to convert the type to number
      date: new Date(input.date.value),
      description: input.description.value,
    };
    const isAmountValid = expenseData.amount > 0 && !isNaN(expenseData.amount);
    const isDateValid = expenseData.date.toString() !== 'Invalid Date';
    const isDescriptionValid = expenseData.description.trim().length > 0;

    if (!isAmountValid || !isDateValid || !isDescriptionValid) {
      // Alert.alert('Invalid Input', 'Please check your input values!');
      //return;
      setInput((currentInputs)=> {
        return {
          amount: {value: currentInputs.amount.value, isValid: isAmountValid},
          date: {value: currentInputs.date.value, isValid: isDateValid},
          description: {value: currentInputs.description.value, isValid: isDescriptionValid}
        }
      })

      return;
    }

    onSubmit(expenseData);
  };

  const isFormValid = !input.amount.isValid || !input.amount.isValid || !input.amount.isValid;


  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRows}>
        <Input
          label="Amount"
          style={styles.rowInput}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: input.amount.value,
          }}
        />
        <Input
          label="Date"
          style={styles.rowInput}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: input.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: input.description.value,
        }}
      />
      {isFormValid && <Text>Invalid input values. Please check your entered data!</Text>}
      <View style={styles.buttons}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginVertical: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
    marginBottom: 30,
  },
  inputRows: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
