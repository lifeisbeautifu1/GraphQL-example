import GraphQL, { GraphQLInt, GraphQLObjectType } from 'graphql';
import Book from '../models/Book.js';
import Author from '../models/Author.js';

const { GraphQLString, GraphQLSchema, GraphQLID, GraphQLList } = GraphQL;

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      async resolve(parent, args) {
        return await Author.findOne({ _id: parent.authorId });
        // return authors.find((author) => author.id === parent.authorId);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLID },
    books: {
      type: new GraphQLList(BookType),
      async resolve(parent, args) {
        return await Book.find({
          authorId: parent.id,
        });
        // return books.filter((book) => book.authorId === parent.id);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return await Book.findById(args.id);
        // return books.find((book) => book.id === args.id);
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      async resolve(parent, args) {
        return await Author.findById(args.id);
        // return authors.find((author) => author.id === args.id);
      },
    },
    books: {
      type: new GraphQLList(BookType),
      async resolve(parent, args) {
        return await Book.find();
        // return books;
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      async resolve(parent, args) {
        return await Author.find();
        // return authors;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      async resolve(parent, args) {
        const { name, age } = args;
        const author = await Author.create({
          name,
          age,
        });
        return author;
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID },
      },
      async resolve(parent, args) {
        const { name, genre, authorId } = args;
        const book = await Book.create({
          name,
          genre,
          authorId,
        });
        return book;
      },
    },
  },
});

const Schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

export default Schema;
