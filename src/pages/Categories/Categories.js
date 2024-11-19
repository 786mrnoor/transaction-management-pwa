import { useCategory, useCategoryModal } from "../../ContextProvider/CategoryContextProvider"
import Category from "./Category";

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
        <ul className="sortable-list list-group p-3 mt-4 mb-4">
            {
                data.map(category => (
                    <Category data={category} edit={edit} key={category.id}>
                        <button className="btn btn-primary btn-sm" type="button" onClick={() => onEdit(category)}>Edit</button>
                        <button className="btn btn-danger btn-sm" type="button" onClick={() => handleDelete(category.id)}>Delete</button>
                    </Category>
                ))
            }
        </ul>
    )
};
