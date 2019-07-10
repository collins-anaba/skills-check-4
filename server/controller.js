const bcrypt = require("bcrypt");

const register = async (req,res) => {
    const db = req.app.get('db'),
        { username, password, user_pic } = req.body;

    const result = await db.get_user([ username ])
    const existingUser = result[0]

    if(existingUser) {
        return res.status(409).send('Username taken, try again')
    }

    const salt = bcrypt.genSaltSync(12)
    const hash = bcrypt.hashSync(password, salt)
    const registeredUser = await db.register_user([ username, hash, user_pic ])
    const user = registeredUser[0]
    if(user) {
        req.session.user = { username: user.username, id: user.id, profile: user.user_pic }
    }
    

    return res.status(201).send(req.session.user)
}

const login = async (req,res) => {
    const db = req.app.get('db'),
    { username, password } = req.body;

    const foundUser = await db.get_user([username]);
    const user = foundUser[0];

    if (!user) {
        return res.status(401).send('User not found.');
    }

    const isAuthenticated = bcrypt.compareSync(password, user.hash);
    if (!isAuthenticated) {
        return res.status(403).send('Incorrect password');
    }

    req.session.user = { id: user.id, username: user.username, profile: user.user_pic };
        
    return res.send(req.session.user);
}

const session = async (req,res) => {
    const db = req.app.get('db'),
    { username } = req.session.user;

    const foundUser = await db.get_user([username]);
    const user = foundUser[0];
    if (req.session) {
        req.session.user = { id: user.id, username: user.username, profile: user.user_pic };
    
        return res.send(req.session.user);
    }
}


const logout = (req,res) => {
    req.session.destroy();
    return res.sendStatus(200);
}

const postMessage = async (req,res) => {
    const db = req.app.get('db'),
        { title, image, content } = req.body,
        { id } = req.session.user;

    const postMessage = await db.post_message( [ id, title, image, content ] )
    return res.status(200).send(postMessage)
}

const getMessages = async (req,res) => {
    const db = req.app.get('db')
    const messages = await db.get_messages()
    res.status(200).send(messages)
}

module.exports = {
    register,
    login,
    session,
    logout,
    postMessage,
    getMessages
}