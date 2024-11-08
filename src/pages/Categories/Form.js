import { useState } from "react";
import { useCategoryModal } from "../../ContextProvider/CategoryContextProvider"

const VALUE = '';
export default function Form({ edit, setEdit }) {
    const [title, setValue] = useState(VALUE);
    const CategoryModal = useCategoryModal();

    const [isEditable, setIsEditable] = useState(edit);

    if (isEditable !== edit) {
        setIsEditable(edit);
        if (edit) {
            setValue(edit.title);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        //if edit then update and return
        if (edit) {
            edit.title = title;
            CategoryModal.update(edit.id, edit);
            handleReset();
            return;
        }
        //if new 
        CategoryModal.post(title);
        handleReset();
    }

    function handleReset() {
        setEdit(false);
        setValue(VALUE);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="input-group">
                <span className="input-group-text">Title</span>
                <input type="text" value={title} onChange={e => setValue(e.target.value)} className="form-control" />
                <button className="btn btn-primary">{edit ? 'Update' : 'Add'}</button>
                {edit &&
                    <button className="btn btn-danger" onClick={handleReset}>Reset</button>
                }
            </div>
        </form>
    )
};
