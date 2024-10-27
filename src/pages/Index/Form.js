import { useState } from "react"
import { useTransactionModal } from "../../ContextProvider/TransactionContextProvider";

const VALUE = {
    description: '',
    amount: 0,
    status: 'completed',
    category: 'CSC',
    type: 'Cr'
}

export default function Form() {
    const [value, setValue] = useState(VALUE);
    
    const TransactionModal = useTransactionModal();

    function handleInput(e) {
        setValue({ ...value, [e.target.id]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        TransactionModal.post(value);
        setValue(VALUE);
    }
    return (
        <form onSubmit={handleSubmit}>
            <h2 id="formHeader">Transactions</h2>
            <main>
                <select id="type" value={value.type} onChange={handleInput}  >
                    <option value="Cr">Credit</option>
                    <option value="Dr">Debit</option>
                </select>
                <div className="inputField">
                    <input type="text" id="description" value={value.description} onChange={handleInput} required={true} />
                    <span>Description</span>
                </div>
                <div className="inputField">
                    <input type="number" id="amount" value={value.amount} onChange={handleInput} required={true} />
                    <span>Amount</span>
                </div>
                <select id="status" value={value.status} onChange={handleInput}  >
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                </select>
                <select id="category" value={value.category} onChange={handleInput} >
                    <option value="CSC">CSC</option>
                    <option value="Printer">Printer</option>
                    <option value="E-district">E-district</option>
                </select>
            </main>
            <footer>
                <button type="button" onClick={() => setValue(VALUE)}>Reset</button>
                <button type="submit">Add</button>
            </footer>
        </form>
    )
};
