import React from 'react';
import { getBookQuery } from '../queries/queries';
import { useQuery } from '@apollo/client';

const BookDetails = ({ selected }) => {
  const { isLoading, error, data } = useQuery(getBookQuery, {
    variables: {
      id: selected,
    },
  });
  console.log(data);
  return (
    <div className="book-details">
      {data?.book ? (
        <>
          <h2>{data?.book.name}</h2>
          <h3>{data?.book.genre}</h3>
          <p>{data?.book.author.name}</p>
          <p>More books from this author</p>
          <ul>
            {data?.book.author.books.map((book) => (
              <li key={book.id}>{book.name}</li>
            ))}
          </ul>
        </>
      ) : (
        <h1>No book selected</h1>
      )}
    </div>
  );
};

export default BookDetails;
