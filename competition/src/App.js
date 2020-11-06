import './App.css';
import  ListLeagues from './components/ListLeagues';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import DetailsLeague from './components/DetailsLeague';
import { nav} from 'react-bootstrap'
import ListeTeams from './components/ListeTeams'
import Game from './components/Game'
import TeamDetails from './components/TeamDetails';
import axios from 'axios';
import React, {Component} from 'react';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';

class App extends Component{
  state={
    Leagues: [],
        league: {} ,
        Games: [],
        loading: false
};
componentDidMount ()  {
  const callAPI = async ()=>{
      this.setState({ loading: true });
      const res = await axios.get('https://api.pandascore.co/leagues?token=p2QLSBRlOzxBl8FG0P0YwvP2O-GsbPjHhEM7_7d6dS2jvS6BZV0');
      this.setState({ Leagues: res.data,loading:false });
  }
  callAPI().then(()=>{
      let tempGames = []
          for(let league of this.state.Leagues){
              if(!tempGames.find(game => game.name == league.videogame.name && game.id ==league.videogame.id)){
                  tempGames = [...tempGames,{name:league.videogame.name,id:league.videogame.id}]
              }
          }
          this.setState({...this.state,Games:tempGames})
  })
}
  render(){
    const ai=this.state.Games.map((elem)=> <a href={`/Game/${elem.id}`} key={elem.id}>{elem.name}</a>);
  return (
   
    <div className="App">
      <Router>
       
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
        <ul className="navbar-nav mr-auto">
          <li><Link to={'/leagues'} className="nav-link"  ><h5 style={{color:'white'}}>Leagues</h5></Link></li>
          <li><Link to={'/teams'} className="nav-link"><h5 style={{color:'white'}}>Teams</h5></Link></li>
          <li className="nav-item dropdown">
          <button className="dropbtn"><h5 style={{color:'white'}}>ALL Games </h5>
            <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
              <Router>
              {ai}
              </Router> 
            </div>
          </li>
        </ul>
        
      </nav>
      <Switch>
        <Route  exact path='/' component={ListLeagues}/>
        <Route  exact path='/Game/:id' component={Game}/>
        <Route exact path='/leagues' component={ListLeagues}/>
        <Route path='/leagues/:leagueId' component={DetailsLeague}/>
        <Route exact path='/teams' component={ListeTeams}/>
        <Route path='/teams/:teamId' component={TeamDetails}/>
        
    

      </Switch>
      
      </Router>
      </div>
  );
}
}
export default App;
