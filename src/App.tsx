import React from 'react'

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import { Layout } from 'antd'

import './App.css'

import Repo from './components/repo/repo'
import MainRenderer from './components/mainRenderer'
import HeaderElement from './components/header/header'
import FooterElement from './components/footer/footer'

const { Footer, Content } = Layout

const App = () => {
  return (
    <Router>
      <HeaderElement />
      <Content>
        <Switch>
          <Route path="/:owner/:repo">
            <MainRenderer />
          </Route>
          <Route path="/" exact>
            <Repo />
          </Route>
        </Switch>
      </Content>
      <Footer className="footer">
        <FooterElement />
      </Footer>
    </Router>
  )
}

export default App
