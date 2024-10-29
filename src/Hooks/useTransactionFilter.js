import { useState } from "react";

const FILTER = {
    search: "",
    type: 'All',
    status: 'All',
    category: 'All',
}

export default function useTransactionFilter(transactions) {
    const [{ search, type, status, category }, setFilter] = useState(FILTER);
    let debit = 0;
    let credit = 0;
    const filteredTransactions = transactions.filter(tr => {
        if (
            tr.description.includes(search) &&
            (type === 'All' || type === tr.type) &&
            (status === 'All' || status === tr.status) &&
            (category === 'All' || category === tr.category)
        ) {
            if (tr.type === 'Cr') {
                credit += tr.amount;
            }
            if (tr.type === 'Dr') {
                debit += tr.amount;
            }
            return true;
        }
    });

    return [{ debit, credit, data: filteredTransactions }, setFilter];
};
