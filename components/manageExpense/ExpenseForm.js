import { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Input from "./Input";
import Button from "../ui/Button";
import { GlobalStyles } from "../../constants/styles";

const ExpenseForm = ({ onCancel, onSubmit, submitButtonLabel, defaultValues }) => {
  const [inputs, setInputs] = useState({
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
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: {value: enteredValue, isValid: true},
      };
    });
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +inputs.amount.value, //using + to convert the type to number
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };
    const isAmountValid = expenseData.amount > 0 && !isNaN(expenseData.amount);
    const isDateValid = expenseData.date.toString() !== 'Invalid Date';
    const isDescriptionValid = expenseData.description.trim().length > 0;

    if (!isAmountValid || !isDateValid || !isDescriptionValid) {
      // Alert.alert('Invalid Input', 'Please check your input values!');
      //return;
      setInputs((curInputs)=> {
        return {
          amount: {value: curInputs.amount.value, isValid: isAmountValid},
          date: {value: curInputs.date.value, isValid: isDateValid},
          description: {value: curInputs.description.value, isValid: isDescriptionValid}
        }
      });
      return;
    }

    onSubmit(expenseData);
  };

  const isFormValid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;


  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRows}>
        <Input
          label="Amount"
          invalid={!inputs.amount.isValid}
          style={styles.rowInput}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
        <Input
          label="Date"
          invalid={!inputs.date.isValid}
          style={styles.rowInput}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />

      {isFormValid && <Text style={styles.errorText}>Invalid input values. Please check your entered data!</Text>}

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
  errorText: {
     textAlign: 'center',
     color: GlobalStyles.colors.error500,
     margin: 8,
  }
});
