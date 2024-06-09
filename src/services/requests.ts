import {
  ApiDeleteUser,
  ApiGetUser,
  ApiSignIn,
  ApiSignUp,
  ApiUpdateUser,
} from "../@types/Auth";
import {
  ApiDeleteTransaction,
  ApiGetDashboard,
  ApiGetTransaction,
  ApiGetTransactions,
  ApiNewTransacion,
  ApiUpdateTransaction,
  TransactionStatus,
} from "../@types/Transaction";
import { formatDate } from "../utils/formatDate";
import { api } from "./api";

// Auth
export const signUp = async (name: string, email: string, password: string) => {
  return await api<ApiSignUp>({
    endPoint: "auth/signup",
    method: "POST",
    data: { name, email, password },
    withAuth: false,
  });
};

export const signIn = async (email: string, password: string) => {
  return await api<ApiSignIn>({
    endPoint: "auth/signin",
    method: "POST",
    data: { email, password },
    withAuth: false,
  });
};

// User
export const getUser = async () => {
  return await api<ApiGetUser>({
    endPoint: "auth/me",
  });
};

export const updateUser = async (name: string, email: string) => {
  return await api<ApiUpdateUser>({
    endPoint: "users",
    method: "PUT",
    data: { name, email },
  });
};

export const deleteUser = async () => {
  return await api<ApiDeleteUser>({
    endPoint: "users",
    method: "DELETE",
  });
};

// Transactions
export const getTransactions = async (page: number) => {
  return await api<ApiGetTransactions>({
    endPoint: "transactions",
    data: { page },
  });
};

export const getTransaction = async (id: number) => {
  return await api<ApiGetTransaction>({
    endPoint: `transactions/${id}`,
  });
};

export const newTransactions = async (
  title: string,
  amount: number,
  status?: TransactionStatus
) => {
  return await api<ApiNewTransacion>({
    endPoint: "transactions",
    method: "POST",
    data: { title, amount, status },
  });
};

export const updateTransactions = async (
  id: number,
  title: string,
  amount: number,
  status: TransactionStatus
) => {
  return await api<ApiUpdateTransaction>({
    endPoint: `transactions/${id}`,
    method: "PUT",
    data: { title, amount, status },
  });
};

export const deleteTransactions = async (id: number) => {
  return await api<ApiDeleteTransaction>({
    endPoint: `transactions/${id}`,
    method: "DELETE",
  });
};

// Dashboard
export const getDashboard = async (month: string, year: string) => {
  const response = await api<ApiGetDashboard>({
    endPoint: "dashboard",
  });

  let balance = 0;
  let pending_transactions = response.data?.pending_transactions ?? 0;
  let completed_transactions = response.data?.completed_transactions ?? 0;

  if (response.data) {
    response.data.transactions.map((transaction) => {
      const date = formatDate(transaction.created_at).split("/");

      if (date[1] == month && date[2] == year) balance += transaction.amount;
    });
  }

  return {
    balance,
    pending_transactions,
    completed_transactions,
  };
};
