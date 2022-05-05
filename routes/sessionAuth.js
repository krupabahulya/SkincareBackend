import session from "express-session";
import { Router } from 'express';

const sessionAuth = Router();

const sess = {
  secret: '12345',
  cookie: {}
}
sessionAuth.use(session(sess));

sessionAuth.get('/login', (req,res) => {
    req.session.user = {name: 'Bahulya'};
    res.send('You are logged in');
});

sessionAuth.get('/secret', (req,res) => {
    return req.session.user ? res.send(`welcome back ${req.session.user.name}`) : res.sendStatus(403);
});

sessionAuth.get('/logout', (req,res) => {
    req.session.destroy(err => {
        if(err) throw err;
        res.send('You are logged out');
    });
});


export default sessionAuth;