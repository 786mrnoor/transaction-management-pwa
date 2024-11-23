import { useEffect, useState } from 'react';
import Form from './Form.js';
import Header from './Header.js';
import Table from './Table.js';
import { flushSync } from 'react-dom';

export default function Home() {
  const [edit, setEdit] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  useEffect(() => {
    function handleBeforePrint() {
      flushSync(() => {
        setIsPrinting(true);
      })
    }

    function handleAfterPrint() {
      setIsPrinting(false);
    }

    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);
    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
    }
  }, []);

  return (
    <>
      <div className="my-container p-3 p-lg-4 index-page">
        <Form edit={edit} setEdit={setEdit} />
        <hr />
        <Header />
        {isPrinting && (
          <h2 className='text-center text-success p-2 mb-2 fs-4'>{getPrintableDate()}</h2>
        )
        }
        <Table edit={edit} onEdit={setEdit} />
      </div>
    </>
  )
};

function getPrintableDate() {
  let d = new Date();
  let date = `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;
  let hour = d.getHours() > 12 ? d.getHours() - 12 : d.getHours();
  let time = `${hour}:${d.getMinutes()}:${d.getHours() < 12 ? 'AM' : 'PM'}`;

  return `${date}, ${time}`
}