import React, {useEffect, useState, Fragment} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
import env from './env';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

const App = () => {
    const classes = useStyles();
    const baseUrl = `${env('REACT_APP_WEBAPP_URL')}/messages`
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const timer = setInterval(() => {
            axios.get(baseUrl)
                .then(({data: newMessages}) => {
                    setMessages(newMessages)
                })
        }, 1000)
        return () => clearInterval(timer)
    }, [baseUrl])

    const onMessageClick = (index) => {
        const message = messages[index]
        axios.put(`${baseUrl}/latest`, message)
    }

    return (
        <div className={classes.root}>
            <List component="nav">
                <Divider/>
                {messages.map(({text}, n) =>
                    <Fragment key={n}>
                        <ListItem button onClick={() => onMessageClick(n)}>
                            <ListItemText primary={text}/>
                        </ListItem>
                        <Divider/>
                    </Fragment>
                )}
            </List>
        </div>
    );
}

export default App
