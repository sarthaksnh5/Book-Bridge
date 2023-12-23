import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  books: [],
  allBooks: [],
  book: '',
};

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    addBook(state, action) {      
      return {
        books: [...state.books, action.payload],
        allBooks: [...state.allBooks, action.payload],
      };
    },
    deleteBook(state, action) {
      let temp = state.books.filter(item => item['id'] !== action.payload);
      state.books = temp;
      state.allBooks = temp;
      return state;
    },
    setBooks(state, action) {
      state.books = action.payload;
      state.allBooks = action.payload;
      return state;
    },
    filterBooks(state, action) {
      if (action.payload.length > 0) {
        let filteredBooks = state.allBooks.filter(book => {
          return book['title'].toLowerCase().includes(action.payload);
        });
        state.books = filteredBooks;
      } else {
        state.books = state.allBooks;
      }
      return state;
    },
    setSingleBook(state, action) {
      state.book = action.payload;
      return state;
    },
    clearBooks(state, action) {
      state = initialState;
      return state;
    },
  },
});

export const {addBook, deleteBook, setBooks, filterBooks, setSingleBook} =
  bookSlice.actions;
export default bookSlice.reducer;
