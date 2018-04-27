import React, { Component } from 'react'
import Book from './Book'
import PropTypes from 'prop-types';

class BooksGrid extends Component {  

  render(){
    const { books, updateShelf } = this.props

    return(
      <ol className="books-grid">
        {books.map(book => (
          <Book key={book.id} book={book} updateShelf={updateShelf}/>
        ))}
      </ol>
    )
  }
}

BooksGrid.propTypes = {
    books: PropTypes.array.isRequired,
    updateShelf: PropTypes.func.isRequired
};
export default BooksGrid