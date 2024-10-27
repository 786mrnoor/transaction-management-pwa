import { useEffect, useReducer, useRef } from "react";
import { useLoader } from '../ContextProvider/LoaderContextProvider.js';
import TransactionModal from "../models/Transaction.js";
import { useGetUser } from "../ContextProvider/UserContextProvider.js";

export default function useTransactionEffect() {
    const [transactions, dispatch] = useReducer(transactionReducer, null, createInitialState);
    const user = useGetUser();
    const showLoader = useLoader();
    const Transaction = useRef(new TransactionModal(showLoader, user?.uid));

    useEffect(() => {
        let disconnect1 = null;
        let disconnect2 = null;
        let disconnect3 = null;
        function get() {
            disconnect1 = Transaction.current.addChildListener('ADDED', (topic) => {
                dispatch({ type: 'ADD', payload: topic.val() });
            });
            disconnect2 = Transaction.current.addChildListener('CHANGED', (topic) => {
                dispatch({ type: 'UPDATE', payload: topic.val() });
            });
            disconnect3 = Transaction.current.addChildListener('REMOVED', (topic) => {
                dispatch({ type: 'DELETE', payload: topic.val().id });
            });
        }
        if (user?.uid) {
            Transaction.current.userId = user.uid;
            get();
        }
        return () => {
            if (disconnect1) {
                disconnect1();
                disconnect2();
                disconnect3();
            }
        }
    }, [user]);

    return [transactions, Transaction.current];
};

function transactionReducer(state, action) {
    switch (action.type) {
        case "INIT":
            return action.payload;
        case "ADD":
            return [...state, action.payload]
        case "UPDATE":
            let id = action.payload.id;
            return state.map(service => {
                if (service.id === id) return action.payload;
                return service;
            })
        case "DELETE":
            let topicId = action.payload;
            return state.filter(topic => topic.id !== topicId);
        default:
            return state;
    }
}

function createInitialState() {
    return [];
}