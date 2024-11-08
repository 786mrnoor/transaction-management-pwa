import { useCategory } from "../../ContextProvider/CategoryContextProvider";
import { useFilter } from "../../ContextProvider/TransactionContextProvider"

export default function Header() {
    const [filter, setFilter] = useFilter();
    const category = useCategory();

    function handleFilter(e) {
        setFilter(state => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    }

    return (
        <header className="row row-cols-auto gx-1 gy-1 mt-3">
            <div className="col col-12 col-sm-6 col-md-6 col-lg-4" style={{ minWidth: '160px' }}>
                <input type="text" className="form-control form-control-sm" name="search" value={filter.search} onChange={handleFilter} placeholder="Search" required={true} />
            </div>

            <div className="col">
                <div className="input-group input-group-sm">
                    <span className="input-group-text">Type</span>
                    <select value={filter.type} className="form-select" name="type" onChange={handleFilter}>
                        <option value="All">All</option>
                        <option value="Cr">Credit</option>
                        <option value="Dr">Debit</option>
                    </select>
                </div>
            </div>

            <div className="col">
                <div className="input-group input-group-sm">
                    <span className="input-group-text">Status</span>
                    <select value={filter.status} className="form-select" name="status" onChange={handleFilter}>
                        <option value="All">All</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                    </select>
                </div>
            </div>

            <div className="col">
                <div className="input-group input-group-sm">
                    <span className="input-group-text">Category</span>
                    <select value={filter.category} className="form-select" name="category" onChange={handleFilter}>
                        <option value="All">All</option>
                        {
                            category.map(c => (
                                <option key={c.id} value={c.id}>{c.title}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <div className="col">
                <button className="btn btn-sm btn-danger" onClick={() => setFilter('reset')}>Reset</button>
            </div>
        </header>
    )
};
