import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
  } from 'react-router-dom';

import { useDispatch } from 'react-redux'
import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { firebase } from '../firebase/firebaseConfig';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true)
    const [isLoggedIn, setisLoggedIn] = useState(false)


    useEffect (() => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if ( user ) {
                dispatch( login(user.uid, user.displayName));
                setisLoggedIn(true);

                dispatch(startLoadingNotes(user.uid))
                
            } else {
                setisLoggedIn(false);
            }

            setChecking(false);
            
        });
    }, [ dispatch, setChecking, setisLoggedIn ])

    if (checking) {
        return(
            <h1>Wait....</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    {/* <Route 
                        path="/auth"
                        component={ AuthRouter }
                    /> */}

                    <PublicRoute
                        
                        path="/auth" 
                        component={ AuthRouter } 
                        isAuthenticated = {isLoggedIn}
                    />

                    <PrivateRoute
                        exact
                        path="/" 
                        component={ JournalScreen } 
                        isAuthenticated = {isLoggedIn}
                    />



                    {/* <Route 
                        
                        path="/"
                        component={  }
                    />

                    <Redirect to="/auth/login" /> */}


                </Switch>
            </div>
        </Router>
    )
}
