import { createContext, useContext } from "react";
import useTransactionEffect from "../ModalEffects/Transaction.js";


const TransactionContext = createContext([]);
const TransactionModalContext = createContext(null);

export function useTransaction() {
    return useContext(TransactionContext);
}

export function useTransactionModal() {
    return useContext(TransactionModalContext);
}

export default function TransactionContextProvider({ children }) {
    const [transactions, Transaction] = useTransactionEffect();    

    return (
        <TransactionContext.Provider value={transactions}>
            <TransactionModalContext.Provider value={Transaction}>
                {children}
            </TransactionModalContext.Provider>
        </TransactionContext.Provider>
    )
};