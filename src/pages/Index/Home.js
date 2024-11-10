import { useState } from 'react';
import Form from './Form.js';
import Header from './Header.js';
import Table from './Table.js';

export default function Home() {
  const [edit, setEdit] = useState(false);

  return (
    <>
      <div className="my-container p-3 p-lg-4">
        <Form edit={edit} setEdit={setEdit} />
        <hr />
        <Header />
        <Table edit={edit} onEdit={setEdit} />
      </div>
    </>
  )
};
