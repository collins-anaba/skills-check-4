import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleUpdateUser } from '../../ducks/reducer';
import DashBoard from '../Dashboard/Dashboard';
import axios from 'axios';


export class Auth extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    componentDidMount() {
        axios
            .get('/api/session')
            .then((user) => {
                this.props.handleUpdateUser(user.data) 
        })
    }


    handleChange= (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    logIn = () => {
        let { username, password }= this.state
        axios
            .post('/api/auth/login', { username, password })
            .then(user => {
                this.props.handleUpdateUser(user.data) 
                this.setState({
                    username: '',
                    password: ''
                })
            })
            .catch(() => alert('Incorrect username or password'));
    }

    render() {
        console.log(this.props)
        let { id } = this.props.user
        return (
            !id ? (
                <div className='container center background'>
                    
                        <h1>Auth Page</h1>
                        <form>
                            <br/>
                            <label for="username">Username</label>
                            <input type="text" name="username" placeholder="Username" 
                            onChange={e => this.handleChange(e)}
                            />
                            <br/>
                            <br/>
                            <label for="password">Password</label>
                            <input type="password" name="password" placeholder="password" 
                            onChange={e => this.handleChange(e)}
                            />
                            <br/>
                            <button
                            onClick={() => this.logIn()}
                            >Submit</button>
                        </form>
                        
                </div>
            )
            :
            (
                <DashBoard />
            )
            
        )
    }
}

function mapStateToProps(state) {
    const { user } = state
    return { user }
}

export default connect(mapStateToProps, { handleUpdateUser })(Auth)