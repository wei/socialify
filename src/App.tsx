import React from 'react'

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import { Layout } from 'antd'

import './App.css'

import Repo from './components/repo/repo'
import MainRenderer from './components/mainRenderer'
import HeaderElement from './components/header/header'
import FooterElement from './components/footer/footer'

const { Header, Footer, Content } = Layout

const App = () => {
  return (
    <Router>
      <Header style={{ backgroundColor: 'rgba(240, 242, 245, 0.6)' }}>
        <HeaderElement></HeaderElement>
      </Header>
      <Content>
        <Switch>
          <Route path="/:owner/:repo">
            <MainRenderer />
          </Route>
          <Route path="/" exact>
            <Repo></Repo>
          </Route>
        </Switch>
      </Content>
      <Footer
        style={{
          position: 'fixed',
          zIndex: 1,
          width: '100%',
          bottom: '0',
          maxHeight: '5vh',
          paddingTop: 0
        }}>
        <FooterElement></FooterElement>
      </Footer>
    </Router>
  )
}

export default App
