import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleUpdateUser } from '../../ducks/reducer';
import Nav from '../Nav/Nav';
import axios from 'axios'

export class Post extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            title: '',
            image: '',
            content: ''
        }
    }

    componentDidMount() {
        axios
            .get('/api/auth/session')
            .then((user) => {
                this.props.handleUpdateUser(user.data) 
        })
    }

    handleChange= (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    postMessage = () => {
        let { title, image, content } = this.state
        
        axios
            .post(`/api/post/`, { title, image, content })
            .then(() => {
                alert('your post was successful')
                this.setState({
                    title: '',
                    image: '',
                    content: ''
                })
            })
    }

    render() {
        return (
            <div>
                <Nav />
                <div className='post-dashboard'>
                <div className='post-container'>
                <label for="exampleFile">Title:</label>
                <input type='text' name='title' 
                onChange={e => this.handleChange(e)}
                />

                <label for="exampleFile">Image:</label>
                <input type='text' name='image_url' 
                onChange={e => this.handleChange(e)}
                />
                <label for="exampleFile">Content:</label>
                <input type='text' name='content' 
                onChange={e => this.handleChange(e)}
                />
                <button
                onClick={() => this.postMessage()}
                >
                    Post
                </button>
                </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { user } = state
    return { user }
}

export default connect(mapStateToProps, { handleUpdateUser })(Post)