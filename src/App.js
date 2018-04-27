import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import BookList from './BookList'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    myBooks: []
  }

  // In this lifecycle event i make API request to fetch the books like in Lesson 4 "Render UI with External Data"
  componentDidMount(){
    BooksAPI.getAll().then((myBooks) => {
      this.setState({myBooks})
    })
  }

  updateShelf = (currentBook, shelf) => {
    currentBook.shelf = shelf
    BooksAPI.update(currentBook, shelf).then(
      this.setState((prevState, props) => {
        return {
          myBooks: prevState.myBooks.map((book) => book.id === currentBook.id ? currentBook : book)
        }
      }


      )
    )
  }

  addBook = (currentBook, shelf) => {
    currentBook.shelf = shelf
    BooksAPI.update(currentBook, shelf).then(
      this.setState(state => (
        {myBooks: state.myBooks.concat([ currentBook ])} //concatenates my books with the chosen book
        )
      )
    )
  }

  render() {
    return (
      <div className="app">

        <Route exact path="/" render={() => (
          <BookList myBooks={this.state.myBooks} updateShelf={this.updateShelf}/>
        )} />
        <Route exact path="/search" render={() => (
          <SearchBooks updateShelf={this.addBook} myBooks={this.state.myBooks}/>
        )} />
      </div>
    )
  }
}

export default BooksApp