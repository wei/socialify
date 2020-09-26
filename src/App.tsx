import React, { useState, useEffect } from 'react'

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import { Layout } from 'antd'

import './App.css'

import RepoType from './types/repoType'
import RepoContext from './contexts/RepoContext'
import Repo from './components/repo/repo'
import MainRenderer from './components/mainRenderer'
import HeaderElement from './components/header/header'
import FooterElement from './components/footer/footer'

const { Header, Footer, Content } = Layout

const App = () => {
  const [repo, setRepo] = useState<RepoType | undefined>(undefined)
  const setRepoHelper = (repo?: RepoType) => {
    setRepo(repo)
  }

  useEffect(() => {
    // TODO: Check query string and call setRepo if applicable
  }, [])

  return (
    <Router>
      <RepoContext.Provider value={{ repo, setRepo: setRepoHelper }}>
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
      </RepoContext.Provider>
    </Router>
  )
}

export default App
