import mongoose from 'mongoose';

const BookSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  authorId: {
    type: String,
    required: true,
  },
});

const Book = new mongoose.model('Book', BookSchema);
export default Book;
