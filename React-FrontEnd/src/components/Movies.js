import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Container, Row, Col, Alert } from 'reactstrap'
import MoviesTable from './MoviesTable'

const Api = require('./Api.js')

class Movies extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: [],
      isLoaded: false,
      error: null
    }
  }

  componentDidMount() {
    Api.getMovies()
      .then(response => {
        const [error, data] = response
        if (error) {
          this.setState({
            isLoaded: true,
            movies: [],
            error: data
          })
        } else {
          this.setState({
            isLoaded: true,
            movies: data
          })
        }
      })
  }

  render() {
    const { error, isLoaded, movies } = this.state

    if (error) {

      return (
        <Alert color="danger">
          Error: {error}
        </Alert>
      )

    } else if (!isLoaded) {

      return (
        <Alert color="primary">
          Loading...
        </Alert>
      )

    } else {

      return (
        <Container>
          <Row>
            <Col>
              <MoviesTable movies={movies}></MoviesTable>
              <Link className="btn btn-primary" to="/movies/new">Add Movie</Link>
            </Col>
          </Row>
        </Container>
      )

    }

  }
}

export default Movies