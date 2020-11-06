import axios from 'axios';
import React, { Component } from 'react'
import Teams from './Teams';



class ListeTeams extends Component{
    constructor(){
        super();
        this.Load = this.Load.bind(this);
        this.getTeams = this.getTeams.bind(this);
        this.state = {
            Teams:[],
            page_nbr:1,
            x_total:0
        };
    }
    Load(nbr){
        this.setState((state) =>
        {
            return{
                Teams: this.state.Teams,
                page_nbr: this.state.page_nbr + nbr,
                x_total: this.state.x_total
            }
        }, ()=>this.getTeams());
    }
    componentDidMount(){
        this.getTeams();
    }
    getTeams(){
        axios.get(process.env.REACT_APP_API_TEAMS_URL+'?page[size]=5&page[number]='+this.state.page_nbr+'&token='+process.env.REACT_APP_TOKEN)
        .then (response =>{
            this.setState({
                Teams: response.data,
                page_nbr: this.state.page_nbr,
                x_total: response.headers["x-total"]
            });
        });
    }
    render(){
        return(
            <>

            <h1>Teams</h1>
            <div className="container">
                {this.state.Teams.map(team=>
                    <Teams key={team.id} team={team}></Teams>)}
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <button onClick={()=>this.Load(-1)} disabled={this.state.page_nbr == 1}>
                            Précedent
                        </button>

                        <button onClick={()=>this.Load(-2)} hidden={this.state.page_nbr-2 < 1}>
                            {this.state.page_nbr-2}
                        </button>
                        <button onClick={()=>this.Load(-1)} hidden={this.state.page_nbr-1 < 1}>
                            {this.state.page_nbr-1}
                        </button>
                        <button onClick={()=>this.Load(0)} disabled={true}>
                            {this.state.page_nbr}
                        </button>
                        <button onClick={()=>this.Load(1)} hidden={this.state.x_total < 5*(this.state.page_nbr)}>
                            {this.state.page_nbr+1}
                        </button>
                        <button onClick={()=>this.Load(2)} hidden={this.state.x_total < 5*(this.state.page_nbr+1)}>
                            {this.state.page_nbr+2}
                        </button>

                        <button onClick={()=>this.Load(1)} disabled={this.state.x_total < 5*this.state.page_nbr}>
                            Suivant
                        </button>
                    </div>
                </div>
            </div>
            </>
        )
    }
}

export default ListeTeams;
