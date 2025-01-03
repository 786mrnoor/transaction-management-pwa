import { useEffect, useState } from "react"
import { useTransactionModal } from "../../ContextProvider/TransactionContextProvider";
import { useCategory } from "../../ContextProvider/CategoryContextProvider";

const VALUE = {
    description: '',
    amount: 0,
    status: 'completed',
    category: '',
    type: 'Cr'
}

export default function Form({ edit, setEdit }) {
    const [value, setValue] = useState(VALUE);
    const [isEditable, setIsEditable] = useState(edit);
    const TransactionModal = useTransactionModal();
    const category = useCategory();

    useEffect(() => {
        if (category.length > 0) {
            setValue(s => ({ ...s, category: category[0].id }))
            VALUE.category = category[0].id;
        }
    }, [category]);


    if (isEditable !== edit) {
        setIsEditable(edit);
        if (edit) {
            setValue(edit);
        }
        if (category.length > 0) {
            setValue(s => ({ ...s, category: category[0].id }))
        }
    }

    function handleInput(e) {
        setValue({ ...value, [e.target.id]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        value.amount = Number(value.amount);

        //if edit then update and return
        if (edit) {
            TransactionModal.update(edit.id, value);
            handleReset();
            return;
        }
        //if new 
        TransactionModal.post(value);
        handleReset();
    }

    function handleReset() {
        setEdit(false);
        setValue(VALUE);
    }

    return (
        <div className={(edit ? 'bg-info ' : '') + "form"}>
            <form onSubmit={handleSubmit} className="row row-cols-1 row-cols-md-2 row-cols-lg-3 gy-2">
                <div className="col">
                    <div className="input-group">
                        <label htmlFor="type" className="input-group-text">Type</label>
                        <select id="type" className="form-select" value={value.type} onChange={handleInput}  >
                            <option value="Cr">Credit</option>
                            <option value="Dr">Debit</option>
                        </select>
                    </div>
                </div>

                <div className="col">
                    <div className="input-group">
                        <label htmlFor="status" className="input-group-text">Status</label>
                        <select className="form-select" id="status" value={value.status} onChange={handleInput}  >
                            <option value="completed">Completed</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div>
                </div>

                <div className="col">
                    <div className="input-group">
                        <label htmlFor="category" className="input-group-text">Category</label>
                        <select className="form-select" id="category" value={value.category} onChange={handleInput} required>
                            {
                                category.map(c => (
                                    <option key={c.id} value={c.id}>{c.title}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>

                <div className="col">
                    <div className="input-group">
                        <label htmlFor="amount" className="input-group-text">Amount</label>
                        <input type="number" className="form-control" id="amount" value={value.amount} onChange={handleInput} required={true} />
                    </div>
                </div>

                <div className="col">
                    <div className="input-group">
                        <label htmlFor="description" className="input-group-text">Description</label>
                        <input type="text" className="form-control" id="description" value={value.description} onChange={handleInput} required={true} />
                    </div>
                </div>

                <div className="col">
                    <div className="btn-group">
                        <button className="btn btn-danger" type="button" onClick={handleReset}>Reset</button>
                        <button className="btn btn-primary" type="submit">{edit ? "Update" : "Add"}</button>
                    </div>
                </div>
            </form>
        </div>
    )
};
