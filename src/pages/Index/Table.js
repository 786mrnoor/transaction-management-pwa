import { useSetFilter, useTransaction, useTransactionModal } from "../../ContextProvider/TransactionContextProvider"
import timeAgo from "../../helpers/timeAgo";

export default function Table({ tableAction }) {
    let transactions = useTransaction();
    const TransactionModal = useTransactionModal();
    const filter = useSetFilter();

    async function handleDelete(topicId) {
        if (window.confirm('Are You Sure You Want To Delete This Topic!')) {
            try {
                await TransactionModal.delete(topicId);
                window.alert('Deleted Successfully')
            } catch (error) {
                console.log(error);
                window.alert(error.message);
            }
        }
    }

    function handleFilter(e) {
        filter(state => ({
            ...state,
            [e.target.id]: e.target.value,
        }));
    }


    let data = transactions.data.sort((a, b) => b.time - a.time);
    return (
        <div className="tableContainer scrollbar">
            <h2><span className="Cr">{transactions.credit}</span> - <span className="Dr">{transactions.debit}</span> = {transactions.credit - transactions.debit}</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th rowSpan={2}>S.N.</th>
                        <th rowSpan={2} className="sortButton" id="name">Description</th>
                        <th className="sortButton" id="questions">AMOUNT DR/CR</th>
                        <th className="sortButton" id="attend">STATUS</th>
                        <th className="sortButton" id="created">CATEGORY</th>
                        <th rowSpan={2} className="sortButton" id="created">TIME</th>
                        <th rowSpan={2}>ACTIONS</th>
                    </tr>
                    <tr>
                        <th>
                            <select id="type" onChange={handleFilter}>
                                <option value="All">All</option>
                                <option value="Cr">Credit</option>
                                <option value="Dr">Debit</option>
                            </select>
                        </th>
                        <th>
                            <select id="status" onChange={handleFilter}>
                                <option value="All">All</option>
                                <option value="completed">Completed</option>
                                <option value="pending">Pending</option>
                            </select>
                        </th>

                        <th>
                            <select id="category" onChange={handleFilter}>
                                <option value="All">All</option>
                                <option value="CSC">CSC</option>
                                <option value="E-district">E-district</option>
                                <option value="Scholarship">Scholarship</option>
                                <option value="PanCard">Pan Card</option>
                                <option value="Printer">Printer</option>
                                <option value="Other">Other</option>
                            </select>
                        </th>
                    </tr>
                </thead>
                <tbody id="tableBody">
                    {data.map((transaction, i) =>
                        <tr key={transaction.id} className={transaction.status === 'pending' ? 'pending' : ''}>
                            <td>{i + 1}</td>
                            <td>{transaction.description}</td>
                            <td className={transaction.type}>{transaction.amount} {transaction.type}</td>
                            <td>{transaction.status}</td>
                            <td>{transaction.category}</td>
                            <td>{timeAgo(transaction.time)} ago</td>
                            <td>
                                {/* <button type="button" onClick={() => tableAction('EDIT', transaction)}>Edit</button> */}
                                <button type="button" onClick={() => handleDelete(transaction.id)}>Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
};