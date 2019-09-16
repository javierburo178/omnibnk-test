import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Table } from 'reactstrap'

class MoviesTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: props.movies
    }
  }

  render() {
    const movies = this.state.movies
    if (movies.length === 0) {
      return <div></div>
    } else {
      return (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Director</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map(movie => (
              <tr key={movie.id}>
                <td>{movie.id}</td>
                <td>{movie.name}</td>
                <td>{movie.description}</td>
                <td>{movie.director}</td>
                <td>
                  <Link className="btn btn-success" to={`/movies/${movie.id}/edit`}>Edit</Link>{' '}
                  <Link className="btn btn-danger" to={`/movies/${movie.id}/delete`}>Delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )
    }
  }
}

export default MoviesTable