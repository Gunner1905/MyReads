import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BooksGrid from './BooksGrid'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
  state = {
    searchedBooks : [],
    message: '',
    searchState : '', // This can be 'noresults', 'searching', 'results', 'error',
  }
  
  changeQuery = (query) => {
    this.setState({ searchedBooks : [], searchState : 'noresults' })
    if(query) {
      this.setState({ searchState : 'searching' })
      BooksAPI.search(query, 20).then((data) => { //search with max results
        let { myBooks } = this.props

        if (data) {
          if(!data.error){
            
            // merge mybooks with fetchedBooks to have correct shelf value
            const fetchedBooks = data.map((bookOne, index) => (
              myBooks.findIndex((bookTwo) => bookTwo.id === bookOne.id) === -1 ? bookOne : myBooks[myBooks.findIndex((bookTwo) => bookTwo.id === bookOne.id)]
            ))

            this.setState({ searchedBooks : fetchedBooks, searchState : 'results' })
          } else {
            this.setState({ searchState : 'error', message: data.error })
          }
        } else {
          this.setState({ searchState : 'noresults' })
        }

      })
    }
  }

  render(){
    const { updateShelf } = this.props
    let { searchedBooks, searchState, message } = this.state


    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search"></Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"
              onChange={(event) => this.changeQuery(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          { searchState === 'error' &&
            <div className="search-book-results-msg">Search error - {message}</div>}
          { searchState === 'searching' &&
            <div className="search-book-results-msg">Searching...</div>}
          { searchState === 'noresults' &&
            <div className="search-book-results-msg">No results found yet</div>}
          { searchState === 'results' &&
            <BooksGrid books={searchedBooks} updateShelf={updateShelf} />}

        </div>
      </div>
    )
  }
}

export default SearchBooks