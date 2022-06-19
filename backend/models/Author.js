import mongoose from 'mongoose';

const AuthorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

const Author = new mongoose.model('Author', AuthorSchema);
export default Author;
