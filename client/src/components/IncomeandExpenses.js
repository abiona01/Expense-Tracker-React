import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { numberWithCommas } from "../utils/format";

function IncomeandExpenses() {
	const { transactions } = useContext(GlobalContext);
	const amounts = transactions.map((transaction) => transaction.amount);

	const income = amounts
		.filter((item) => item > 0)
		.reduce((acc, item) => (acc += item), 0)
		.toFixed(2);

	const expense =
		amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
		-(1).toFixed(2);

	return (
		<div className='incandexp-container'>
			<div>
				<h4>Income</h4>
				<p className='money plus'>+&#8358;{numberWithCommas(income)}</p>
			</div>
			<div>
				<h4>Expenses</h4>
				<p className='money minus'>-&#8358;{numberWithCommas(expense)}</p>
			</div>
		</div>
	);
}

export default IncomeandExpenses;
