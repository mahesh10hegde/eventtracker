import React, {Component} from 'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';

import Main from './components/molecules/main/Main';
import CreateEvent from './pages/CreateEvent';
import Dashboard from './pages/Dashboard';

import HomePage from './pages/HomePage'
class App extends Component{
 
  render(){
    return (
      <div className="App">
        <BrowserRouter>
          
         
          <Main>
            <Switch>
              <Route  exact path="/" component={HomePage}></Route>
              <Route  exact path="/dashboard" component={Dashboard}></Route>
              <Route  exact path="/createevent" component={CreateEvent}></Route>
              <Route  exact path="/createevent/:id" component={CreateEvent}></Route>
            </Switch>
          </Main>
          
        </BrowserRouter>
      </div>
    );
  }
  
}

export default App;
