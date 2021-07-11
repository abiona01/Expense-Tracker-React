import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";
const initialState = {
	transactions: [],
	error: null,
	loading: true,
};

export const GlobalContext = createContext(initialState);

//Provider Component
export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	//Actions
	async function getTransactions() {
		try {
			const res = await axios.get("/api/v1/transactions");
			dispatch({
				type: "GET_TRANSACTIONS",
				payload: res.data.data,
			});
		} catch (error) {
			dispatch({
				type: "TRANSACTIONS_ERROR",
				payload: error.response.data.error,
			});
		}
	}

	function addTransaction(transaction) {
		dispatch({
			type: "ADD_TRANSACTION",
			payload: transaction,
		});
	}
	async function deleteTransaction(id) {
		try {
			await axios.delete(`/api/v1/transactions/${id}`);
			dispatch({
				type: "DELETE_TRANSACTION",
				payload: id,
			});
		} catch (error) {
			dispatch({
				type: "TRANSACTIONS_ERROR",
				payload: error.response.data.error,
			});
		}
	}
	return (
		<GlobalContext.Provider
			value={{
				transactions: state.transactions,
				error: state.error,
				loading: state.loading,
				getTransactions,
				addTransaction,
				deleteTransaction,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
