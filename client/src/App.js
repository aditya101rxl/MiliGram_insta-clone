import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Auth } from './components/auth/Auth';
import { Home } from './components/home/Home'
import { GlobalProvider } from './context/global/GlobalStates'
import { Navbar } from './components/navbar/Navbar'
import { Profile } from './components/profileView/profile/Profile'
import { Form } from './components/createPost/Form'
import { PostView } from './components/postsView/PostView'
import { ChatBody } from './components/inbox/chatBody/ChatBody'
import { SnackbarProvider } from 'notistack'

const App = () => {

  return (
    <div style={{ maxWidth: "63rem", margin: "0 auto" }}>
      <SnackbarProvider maxSnack={3}
        iconVariant={{
          success: '✔ ',
          error: '✖️ ',
          warning: '⚠️ ',
          info: 'ℹ️ ',
        }}
      >
        <GlobalProvider>
          <Router>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/user/auth" component={Auth} />
              <Route exact path="/post/createPost" component={Form} />
              <Route exact path="/user/inbox" component={ChatBody} />
              <Route path="/post/postView/:id" component={PostView} />
              <Route path="/user/profile/:username" component={Profile} />
            </Switch>
          </Router>
        </GlobalProvider>
      </SnackbarProvider>
    </div>
  )
}

export default App