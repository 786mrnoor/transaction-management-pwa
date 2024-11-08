import { useState } from "react";

const FILTER = {
    search: "",
    type: 'All',
    status: 'All',
    category: 'All',
}

export default function useTransactionFilter(transactions) {
    let [filter, setFilter] = useState(FILTER);
    let { type, status, category } = filter;
    let search = filter.search.toLowerCase();

    let obj = {
        debit: 0,
        credit: 0,
        pendingDebit: 0,
        pendingCredit: 0,
    }
    const filteredTransactions = transactions.filter(tr => {
        if (
            tr.description.toLowerCase().includes(search) &&
            (type === 'All' || type === tr.type) &&
            (status === 'All' || status === tr.status) &&
            (category === 'All' || category === tr.category)
        ) {
            if (tr.type === 'Cr') {
                obj.credit += tr.amount;
                obj.pendingCredit += tr.status === 'pending' ? tr.amount : 0;
            }
            if (tr.type === 'Dr') {
                obj.debit += tr.amount;
                obj.pendingDebit += tr.status === 'pending' ? tr.amount : 0;
            }
            return true;
        }
        return false;
    });

    function handleSetFilter(value) {
        if (typeof value === 'function') {
            setFilter(s => value(s));
        }
        else if (value === 'reset') {
            setFilter(FILTER);
        } else {
            setFilter(value);
        }
    }
    return [{ ...obj, data: filteredTransactions }, filter, handleSetFilter];
};
