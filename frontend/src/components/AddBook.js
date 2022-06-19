import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from '../queries/queries';

const AddBook = () => {
  const { isLoading, error, data } = useQuery(getAuthorsQuery);
  const [addBookMut] = useMutation(addBookMutation, {
    refetchQueries: [{ query: getBooksQuery }],
  });
  const [formData, setFormData] = React.useState({
    name: '',
    genre: '',
    authorId: '',
  });

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addBookMut({
      variables: {
        name: formData.name,
        genre: formData.genre,
        authorId: formData.authorId,
      },
    });
  };
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>Error occured loading authors...</h1>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label>Book name:</label>
        <input type="text" name="name" onChange={handleChange} />
      </div>
      <div className="field">
        <label>Genre: </label>
        <input type="text" name="genre" onChange={handleChange} />
      </div>
      <div className="field">
        <label>Author:</label>
        <select name="authorId" onChange={handleChange}>
          <option value="">Select Author</option>
          {data?.authors.map((author) => {
            return (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            );
          })}
        </select>
      </div>
      <button>+</button>
    </form>
  );
};

export default AddBook;
