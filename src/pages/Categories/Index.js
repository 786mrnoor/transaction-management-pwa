import { useState } from "react";
import Categories from "./Categories";
import Form from "./Form";

export default function Index() {
    const [edit, setEdit] = useState(false);
    return (
        <div className="container border p-3 bg-body-secondary">
            <Form edit={edit} setEdit={setEdit} />
            <Categories edit={edit} onEdit={setEdit} />
        </div>
    )
};
