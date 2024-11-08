import { useCategory, useCategoryModal } from "../../ContextProvider/CategoryContextProvider"
import timeAgo from "../../helpers/timeAgo";

export default function Categories({ edit, onEdit }) {
    const data = useCategory();
    const CategoryModal = useCategoryModal();

    async function handleDelete(categoryId) {
        if (window.confirm('Are You Sure You Want To Delete This Topic!')) {
            try {
                await CategoryModal.delete(categoryId);
                window.alert('Deleted Successfully')
            } catch (error) {
                console.log(error);
                window.alert(error.message);
            }
        }
    }

    return (
        <ul className="list-group mt-4">
            {
                data.map(category => (
                    <li key={category.id} className={"list-group-item category-list-item" + (edit.id === category.id ? " bg-info-subtle" : '')}>
                        <div>
                            <p className="fw-bold m-0 lh-1">{category.title}</p>
                            <span className="my-fs-sm">{timeAgo(category.time)}</span>
                        </div>
                        <div className="btn-group">
                            <button className="btn btn-primary btn-sm" type="button" onClick={() => onEdit(category)}>Edit</button>
                            <button className="btn btn-danger btn-sm" type="button" onClick={() => handleDelete(category.id)}>Delete</button>
                        </div>
                    </li>
                ))
            }
        </ul>
    )
};
