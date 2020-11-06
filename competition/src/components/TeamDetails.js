import React, { Component } from 'react'
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';

 class TeamDetails extends Component {
    constructor(props){
        super(props);
        this.state={
            TDetails:[]
        };
        this.getDetails();
    }
    componentDidMount(){
        this.getDetails();
    }
    getDetails = () => {
        fetch(process.env.REACT_APP_API_TEAMS_URL+'/'+this.props.match.params.teamId+'?token='+process.env.REACT_APP_TOKEN)
        .then(response=> response.json())
        .then(
            result=>{
                this.setState({
                    TDetails:result
                });
            },
            (error)=>{
                this.setState({error});
            }
        );
    }
    
    render() {
        return (
            <div>
                <div>
                    <img src={this.state.TDetails && this.state.TDetails.image_url+'?token='+process.env.REACT_APP_TOKEN}/>
                    <h1>{this.state.TDetails && this.state.TDetails.name}</h1>
                    <p>Game: {this.state.TDetails && this.state.TDetails.current_videogame && this.state.TDetails.current_videogame.name}</p>
                    <hr></hr>
                    <SportsEsportsIcon/>
                    <hr></hr>
                    <div className="row">
                        <div className="col align-self-center">
                        {this.state.TDetails && this.state.TDetails.players && this.state.TDetails.players.map(
                            player=> <span className='alert'>{player.first_name}</span>
                        )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TeamDetails
