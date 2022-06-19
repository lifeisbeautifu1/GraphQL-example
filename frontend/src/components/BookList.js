import React from 'react';
import { useQuery } from '@apollo/client';
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

const BookList = () => {
  const { loading, error, data } = useQuery(getBooksQuery);
  const [selected, setSelected] = React.useState(null);
  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>Oops..Something went wrong...</h1>;
  }
  return (
    <>
      <ul className="book-list">
        {data.books.map((book) => {
          return (
            <li onClick={() => setSelected(book.id)} key={book.id}>
              {book.name}
            </li>
          );
        })}
      </ul>
      <BookDetails selected={selected} />
    </>
  );
};

export default BookList;
