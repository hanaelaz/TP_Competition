import Axios from 'axios';
import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import League from './League';
import '../App.css';
import Pagination from "@material-ui/lab/Pagination";


export class Game extends Component {
    
        state = {
            Leagues: [],
            league: {} ,
            Games: [],
            totalResults:0,
            currentPage:1,
            loading: false,
          };
    

   
  
    
      
      
      componentDidMount = async() => {
        const {id} = this.props.match.params

        //this.setState({leagues:this.getLeag(this.props.match.params.id )});
        const res = await Axios.get(`https://api.pandascore.co/videogames/${id}/leagues?page[size]=5&token=Z24sIXcdqFQ9UWkWjriv1RWqu52AAxcyIu7kgh5FGSvaH_kYFUQ`)

        this.setState({...this.state,Leagues:res.data,totalResults:res.headers["x-total"]})
       }
    changePage = (event, value) =>{
        this.setState({currentPage: value})
        fetch("https://api.pandascore.co/leagues?token=Z24sIXcdqFQ9UWkWjriv1RWqu52AAxcyIu7kgh5FGSvaH_kYFUQ&per_page=5&page=" + value)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        Leagues: result
                    });
                },
                (error) => {
                    this.setState({error});
                }
            )
    }


    
    render(){
    return (
        

       <>
       <h1>Games</h1>
            <div className="container">
            {this.state.Leagues.map(league => < League key={league.id} league={league}></League>)}
        </div>
        <div className="container" style={{marginLeft:'37%'}}>
        <Pagination className="paginat" count={Math.floor(this.state.totalResults/5)}  page={this.state.currentPage} onChange={this.changePage} />

        </div>
           
            </>
        
      
       
    )

}
}

export default Game

