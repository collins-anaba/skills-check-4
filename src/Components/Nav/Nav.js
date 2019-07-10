import React, {Component} from 'react';
import { connect } from 'react-redux'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { handleUpdateUser} from '../../ducks/reducer';

export class Nav extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    logout = () => {
        axios.post('/api/logout')
        .then(() => {
            this.props.handleUpdateUser({})
        })
        .catch(err => console.log(err));
    }

    render(){
        return (
            <div className='navPage'>
                <img src={this.props.user.profile} alt="profile pic" id='profile-pic'/>
                <h1>{this.props.user.username}</h1>
                
                <Link to={`/Dashboard/${this.props.user.id}`}>
                <img  alt="home"/></Link>
                
                <Link to={'/Post'}>
                <img  alt="new post"/>
                </Link>
                
                <div className="logout">
                <button onClick={() => this.logout()}>Logout</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const { user } = state
    return { user }
}

export default connect(mapStateToProps, { handleUpdateUser })(Nav)
