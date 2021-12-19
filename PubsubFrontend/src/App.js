import './App.css';
import User from './components/user';
import Rest from './components/restaurant';
import {BrowserRouter as Switch,Route} from "react-router-dom";
// import { Switch } from '@material-ui/core';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/user" component={User}/>
        <Route path="/restaurant" component={Rest}/>
      </Switch>
     {/* <User /> */}
     
     {/* <Rest /> */}
    </div>
    
  );
}

export default App;
