import { useEffect, useReducer, useRef } from "react";
import { useLoader } from '../ContextProvider/LoaderContextProvider.js';
import CategoryModal from "../models/Category.js";
import { useGetUser } from "../ContextProvider/UserContextProvider.js";

export default function useCategoryEffect() {
    const [Categories, dispatch] = useReducer(categoryReducer, null, createInitialState);
    const user = useGetUser();
    const showLoader = useLoader();
    const Category = useRef(new CategoryModal(showLoader, user?.uid));

    useEffect(() => {
        let disconnect1 = null;
        let disconnect2 = null;
        let disconnect3 = null;
        function get() {
            disconnect1 = Category.current.addChildListener('ADDED', (category) => {
                dispatch({ type: 'ADD', payload: category.val() });
            });
            disconnect2 = Category.current.addChildListener('CHANGED', (category) => {
                dispatch({ type: 'UPDATE', payload: category.val() });
            });
            disconnect3 = Category.current.addChildListener('REMOVED', (category) => {
                dispatch({ type: 'DELETE', payload: category.val().id });
            });
        }
        if (user?.uid) {
            Category.current.userId = user.uid;
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

    return [Categories, Category.current];
};

function categoryReducer(state, action) {
    switch (action.type) {
        case "INIT":
            return action.payload;
        case "ADD":
            return [...state, action.payload]
        case "UPDATE":
            let id = action.payload.id;
            return state.map(category => {
                if (category.id === id) return action.payload;
                return category;
            })
        case "DELETE":
            let categoryId = action.payload;
            return state.filter(category => category.id !== categoryId);
        default:
            return state;
    }
}

function createInitialState() {
    return [];
}