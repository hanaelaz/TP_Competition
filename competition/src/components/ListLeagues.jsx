import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import League from './League';
import axios from 'axios';

class  ListLeagues extends Component{
    constructor(){
        super();
        this.Load = this.Load.bind(this);
        this.getLeagues = this.getLeagues.bind(this);
        this.state={
            leagues:[],
            page_nbr:1,
            x_total: 0

        };
    }
    Load(nbr){
        this.setState((state) =>
        {
            return {
                Leagues : this.state.Leagues,
                page_nbr : this.state.page_nbr + nbr,
                x_total: this.state.x_total
            }
        },()=> this.getLeagues());
    }
    componentDidMount() {
        this.getLeagues();
    }
   
/* getLeagues=()=>{
   fetch(process.env.REACT_APP_API_URL+'?token='+process.env.REACT_APP_TOKEN)
    .then(response=>response.json())
    .then(
        result => {
            this.setState({
                leagues:result
            });
        },
        (error)=>{
            this.setState({error});
        }
    );
    console.log(this.env);
}*/
getLeagues(){
    axios.get(process.env.REACT_APP_API+'/leagues?page[size]=5&page[number]='+this.state.page_nbr+'&token='+process.env.REACT_APP_TOKEN)
.then(response => {
    this.setState({
        leagues: response.data,
        page_nbr: this.state.page_nbr,
        x_total: response.headers["x-total"]
    });
});
}

render(){
    
    return (
        <>
        <h1>Leagues</h1>
        <div className="container">
            {this.state.leagues.map(league => < League key={league.id} league={league}></League>)}
        </div>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                <button onClick={() => this.Load(-1)}  disabled={this.state.page_nbr === 1}>Précedent</button>

                <button onClick={() => this.Load(-2)} hidden={this.state.page_nbr-2 <1}>{this.state.page_nbr-2}</button>
                <button onClick={() => this.Load(-1)} hidden={this.state.page_nbr-1 <1}>{this.state.page_nbr-1}</button>
                <button onClick={() => this.Load(0)} disabled={true}>{this.state.page_nbr}</button>
                <button onClick={() => this.Load(1)} hidden={this.state.x_total < 5*(this.state.page_nbr)}>{this.state.page_nbr+1}</button>
                <button onClick={() => this.Load(2)} hidden={this.state.x_total < 5*(this.state.page_nbr + 1)}>{this.state.page_nbr+2}</button>

                <button onClick={() => this.Load(1)} disabled={this.state.x_total<5*this.state.page_nbr}>Suivant</button>
                </div>
            </div>
        </div>
        </>

            
    )

}
    
}

export default ListLeagues;



