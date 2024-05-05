import axios from 'axios';

const URL = 'https://expense-react-native-54783-default-rtdb.firebaseio.com';

export const GETExpenses = async () => {
  const response = await axios.get(`${URL}/expenses.json`);

  const expenses = [];

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
};

export const POSTExpense = async (data) => {
  const response = await axios.post(`${URL}/expenses.json`, data);
  const id = response.data.name;
  return id;
};

export const UPDATEExpense = (id, data) => {
  return axios.put(`${URL}/expenses/${id}.json`, data);
};

export const DELETEExpense = (id) => {
  return axios.delete(`${URL}/expenses/${id}.json`);
};
