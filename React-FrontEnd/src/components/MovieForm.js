import React, { Component } from 'react'
import { Redirect } from 'react-router'
import { Container, Row, Col, Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap'

const Api = require('./Api.js')

class MovieForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      movie: {
        id: this.getMovieId(props),
        name: '',
        description: '',
        director: ''
      },
      redirect: null,
      errors: []
    }

    this.setName = this.setName.bind(this)
    this.setDescription = this.setDescription.bind(this)
    this.setDirector = this.setDirector.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getMovieId(props) {
    try {
      return props.match.params.id
    } catch (error) {
      return null
    }
  }

  setName(event) {
    let newVal = event.target.value || ''
    this.setFieldState('name', newVal)
  }

  setDescription(event) {
    let newVal = event.target.value || ''
    this.setFieldState('description', newVal)
  }

  setDirector(event) {
    let newVal = event.target.value || ''
    this.setFieldState('director', newVal)
  }

  setFieldState(field, newVal) {
    this.setState((prevState) => {
      let newState = prevState
      newState.movie[field] = newVal
      return newState
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    let movie = {
      name: this.state.movie.title,
      description: this.state.movie.description,
      director: this.state.movie.director
    }

    Api.saveMovie(movie, this.state.movie.id)
      .then(response => {
        const [error, errors] = response
        if (error) {
          this.setState({
            errors: errors
          })
        } else {
          this.setState({
            redirect: '/movies'
          })
        }
      })
  }

  componentDidMount() {
    if (this.state.movie.id) {
      Api.getMovie(this.state.movie.id)
        .then(response => {
          const [error, data] = response
          if (error) {
            this.setState({
              errors: data
            })
          } else {
            this.setState({
              movie: data,
              errors: []
            })
          }
        })
    }
  }

  render() {
    const { redirect, movie, errors } = this.state

    if (redirect) {
      return (
        <Redirect to={redirect} />
      )
    } else {

      return (
        <Container>
          <Row>
            <Col>
              <h3>Edit Movie</h3>

              {errors.length > 0 &&
                <div>
                  {errors.map((error, index) =>
                    <Alert color="danger" key={index}>
                      {error}
                    </Alert>
                  )}
                </div>
              }

              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label for="name">Title</Label>
                  <Input type="text" name="name" id="name" value={movie.name} placeholder="Enter name" onChange={this.setName} />
                </FormGroup>
                 <FormGroup>
                  <Label for="name">Description</Label>
                  <Input type="text" name="description" id="description" value={movie.description} placeholder="Enter description" onChange={this.setDescription} />
                </FormGroup>
                <FormGroup>
                  <Label for="body">Director</Label>
                  <Input type="text" name="director" id="director" value={movie.director} placeholder="Enter Director" onChange={this.setDirector} />
                </FormGroup>
                <Button color="success">Submit</Button>
              </Form>
            </Col>
          </Row>
        </Container>
      )
    }
  }
}

export default MovieForm