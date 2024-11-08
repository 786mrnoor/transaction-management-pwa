import { createContext, useContext } from "react";
import useCategoryEffect from "../ModalEffects/Category.js";


const CategoryContext = createContext([]);
const CategoryModalContext = createContext(null);

export function useCategory() {
    return useContext(CategoryContext);
}

export function useCategoryModal() {
    return useContext(CategoryModalContext);
}

export default function CategoryContextProvider({ children }) {
    const [Categories, Category] = useCategoryEffect();

    return (
        <CategoryContext.Provider value={Categories}>
            <CategoryModalContext.Provider value={Category}>
                {children}
            </CategoryModalContext.Provider>
        </CategoryContext.Provider>
    )
};