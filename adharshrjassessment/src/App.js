import './App.css';
import MyNavbar from './Components/Navbar';
import Dashboard from './Components/Dashboard';
import List from './Components/List';
import SampleForm from './Components/SampleForm';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
function App() {
  return (
    <div className="App">
      <Router>
     <MyNavbar/>
     <Switch>
                <Route exact path='/' />
                <Route path='/Home' component={Dashboard} />
                <Route path='/list' component={List} />
                <Route path='/form' component={SampleForm}/>
                 
    </Switch>
    </Router>
    </div>
  );
}

export default App;
