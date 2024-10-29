import { useSetFilter } from "../../ContextProvider/TransactionContextProvider"

export default function Header() {
    const filter = useSetFilter();
    function handleFilter(e) {
        filter(state => ({
            ...state,
            [e.target.id]: e.target.value,
        }));
    }
    return (
        <header>
            <div className="inputField">
                <input type="text" id="search" onChange={handleFilter} required={true} />
                <span>Search</span>
            </div>
        </header>
    )
};
