import React, { Component } from 'react'

class Book extends Component {
  state = {}

  handleSelectChange = (e) => {
    e.preventDefault()
    if (this.props.updateShelf) {
      this.props.updateShelf(this.props.book, e.target.value)
    }
  }

  render(){
    const { book } = this.props
    const shelves = [
      { text : 'Currently Reading', value : 'currentlyReading' },
      { text : 'Want to Read', value : 'wantToRead' },
      { text : 'Read', value : 'read' },
      { text : 'None', value : 'none' },
    ]


    return(
      <li >
        <div className="book">
          <div className="book-top">
            <div className="book-cover"
              style={{ width: 128, height: 193,
                backgroundImage: book.imageLinks ? `url(${book.imageLinks.thumbnail})` : ""				
              }}>
            </div>

            <div className={`book-shelf-changer book-shelf-changer-${book.shelf}`}>
              <select defaultValue={book.shelf} onChange={this.handleSelectChange}>
                <option value="" disabled>Move to...</option>
                {shelves.map((shelf) => (
                  <option key={shelf.value} value={shelf.value}>{shelf.text}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors ? book.authors.join(", ") : ""}</div>			
        </div>
      </li>
    )
  }
}

export default Book