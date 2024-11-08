import { useTransaction, useTransactionModal } from "../../ContextProvider/TransactionContextProvider"
import timeAgo from "../../helpers/timeAgo";

export default function Table({ edit, onEdit }) {
    let transactions = useTransaction();
    const TransactionModal = useTransactionModal();

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

    let data = transactions.data.sort((a, b) => b.time - a.time);
    return (
        <>
            <div className="row gx-3 p-2 mt-2 bg-secondary-subtle border">
                <span className="col text-success text-nowrap">Total Credit: {transactions.credit}</span>
                <span className="col text-danger text-nowrap">Total Debit: {transactions.debit}</span>
                <span className="col text-success text-nowrap">Pending Credit:  {transactions.pendingCredit}</span>
                <span className="col text-danger text-nowrap">Pending Debit:  {transactions.pendingDebit}</span>
            </div>
            <div className="table-responsive scrollbar mt-2">
                <table className="table table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th rowSpan={2}>S.N.</th>
                            <th rowSpan={2} className="sortButton" id="name">Description</th>
                            <th className="sortButton" id="questions">AMOUNT DR/CR</th>
                            <th className="sortButton" id="attend">STATUS</th>
                            <th className="sortButton" id="created">CATEGORY</th>
                            <th rowSpan={2} className="sortButton" id="created">TIME</th>
                            <th rowSpan={2}>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody id="tableBody" className="table-group-divider">
                        {data.map((transaction, i) =>
                            <tr key={transaction.id}
                                className={(edit.id === transaction.id ? " table-info" : (transaction.status === 'pending' ? 'table-danger' : ''))}>
                                <td>{i + 1}</td>
                                <td>{transaction.description}</td>
                                <td className={transaction.type}>{transaction.amount} {transaction.type}</td>
                                <td>{transaction.status}</td>
                                <td>{transaction.category}</td>
                                <td>{timeAgo(transaction.time)} ago</td>
                                <td>
                                    <div className="btn-group">
                                        <button className="btn btn-primary btn-sm" type="button" onClick={() => onEdit(transaction)}>Edit</button>
                                        <button className="btn btn-danger btn-sm" type="button" onClick={() => handleDelete(transaction.id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
};


{/* <h2><span className="Cr">{transactions.credit}</span> - <span className="Dr">{transactions.debit}</span> = {transactions.credit - transactions.debit}</h2> */ }