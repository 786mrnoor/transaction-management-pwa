import { NavLink } from "react-router-dom";
import { useTransaction, useTransactionModal } from "../../ContextProvider/TransactionContextProvider"
import timeAgo from "../../helpers/timeAgo";

export default function Table({ tableAction }) {
    let transactions = useTransaction();
    console.log(transactions);
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
    return (
        <div className="tableContainer scrollbar">
            <table border="1">
                <thead>
                    <tr>
                        <th>S.N.</th>
                        <th className="sortButton" id="name">Description</th>
                        <th className="sortButton" id="questions">AMOUNT DR/CR</th>
                        <th className="sortButton" id="attend">STATUS</th>
                        <th className="sortButton" id="created">CATEGORY</th>
                        <th className="sortButton" id="created">TIME</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody id="tableBody">
                    {transactions.map((transaction, i) =>
                        <tr key={transaction.id}>
                            <td>{i + 1}</td>
                            <td><NavLink to={`/service/${transaction.id}`}>{transaction.description}</NavLink></td>
                            <td>{transaction.amount} {transaction.type}</td>
                            <td>{transaction.status}</td>
                            <td>{transaction.category}</td>
                            <td>{timeAgo(transaction.time)} ago</td>
                            <td>
                                <button type="button" onClick={() => tableAction('EDIT', transaction)}>Edit</button>
                                <button type="button" onClick={() => handleDelete(transaction.id)}>Delete</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
};