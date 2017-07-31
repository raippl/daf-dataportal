import React, { Component } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import IngestionWizard from '../../views/IngestionWizard/';
import Ontologies from '../../views/Ontologies/'
import Dashboard from '../../views/Dashboard/'
import Dataset from '../../views/Dataset/'

class Full extends Component {
  render() {
    const { history } = this.props
    return (
      <div className="app">
        <Header history={history}/>
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            <Breadcrumb />
            <div className="container-fluid">
              <Switch>
                <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
                <Route path="/ingestionwizzard" name="Forms" component={IngestionWizard} />
                <Route path="/ontologies" name="Ontologies" component={Ontologies} />
                <Route path="/dataset" name="Dataset" component={Dataset} />
                <Redirect from="/" to="/dashboard"/>
              </Switch>
            </div>
          </main>
          <Aside />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Full;
