import { useFilter } from "../../ContextProvider/TransactionContextProvider"

export default function Header() {
    const [filter, setFilter] = useFilter();

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
                        <option value="Bank">Bank</option>
                        <option value="CSC">CSC</option>
                        <option value="E-district">E-district</option>
                        <option value="Scholarship">Scholarship</option>
                        <option value="PanCard">Pan Card</option>
                        <option value="Printer">Printer</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>
            <div className="col">
                <button className="btn btn-sm btn-danger" onClick={() => setFilter('reset')}>Reset</button>
            </div>
        </header>
    )
};
