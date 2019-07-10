import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleUpdateUser } from '../../ducks/reducer';
import Nav from '../Nav/Nav';
import axios from 'axios';

export class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            messages: []
        }
    }

    componentDidMount() {
        axios
            .get('/api/auth/session')
            .then((user) => {
                this.props.handleUpdateUser(user.data) 
        })
        this.getMessages()
    }

    handleChange= (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    getMessages = () => {
        axios
            .get('/api/messages')
            .then(response => {
                this.setState({ messages: response.data })
            })
    }
    render() {
        let { search, messages } = this.state
        let displayMessages = messages.map(message => {
            return (
                <div className='message-map' key={message.id}>
                    <div className='title'>
                        <h2>{message.title}</h2>
                    </div>
                    <div className="info">
                        <h5>{message.username}</h5>
                        <img  alt="post"/>
                    </div>
                </div>
            )
        })
    return (
        <div>
        <Nav />
            <div className="dashboard">
            <div className='container search-bar'>
            <div className='search'>
                <input type='text' name='search' value={search}
                onChange={e => this.handleChange(e)}
                />
                <button>
                    <img  alt="Search"/>
                </button>
                <button>
                    Reset
                </button>
            </div>
            <div className='my-post-check'>
                <h6>My Posts</h6>{'  '}
                <input type='checkbox'/>
            </div>
            </div>

            <div className='messages'>
                {displayMessages}
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

export default connect(mapStateToProps, { handleUpdateUser })(Dashboard)



