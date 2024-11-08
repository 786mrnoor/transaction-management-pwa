import { createContext, useContext, useState } from "react";
import useTransactionEffect from "../ModalEffects/Transaction.js";
import useTransactionFilter from "../Hooks/useTransactionFilter.js";


const TransactionContext = createContext([]);
const TransactionModalContext = createContext(null);
const TransactionFilterContext = createContext(null);

export function useTransaction() {
    return useContext(TransactionContext);
}

export function useTransactionModal() {
    return useContext(TransactionModalContext);
}
export function useFilter() {
    return useContext(TransactionFilterContext);
}


export default function TransactionContextProvider({ children }) {
    const [transactions, Transaction] = useTransactionEffect();
    const [filteredTransactions, filter, setFilter] = useTransactionFilter(transactions);


    return (
        <TransactionContext.Provider value={filteredTransactions}>
            <TransactionModalContext.Provider value={Transaction}>
                <TransactionFilterContext.Provider value={[filter, setFilter]}>
                    {children}
                </TransactionFilterContext.Provider>
            </TransactionModalContext.Provider>
        </TransactionContext.Provider>
    )
};