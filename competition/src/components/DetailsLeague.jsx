import React, { Component } from 'react'
import {Card} from 'react-bootstrap'



class DetailsLeague extends Component{

    constructor(props){
        super(props);
        this.state={
            Details:[]
    
        };
        this.getDetails();
    }
    
    componentDidMount(){
        this.getDetails();
    }

    getDetails=()=>{
        fetch(process.env.REACT_APP_API_URL+'/'+this.props.match.params.leagueId+'?token='+process.env.REACT_APP_TOKEN)
        .then(response=>response.json())
        .then(
            result => {
                this.setState({
                    Details:result
                });
              
            },
            (error)=>{
                this.setState({error});
            }
        );

    }
    render(){
        return (
            <div>
                
                <div>
                <img src={this.state.Details && this.state.Details.image_url+'?token='+process.env.REACT_APP_TOKEN}/>
                    <h1>{this.state.Details && this.state.Details.name}</h1>
                    <p>Game: {this.state.Details && this.state.Details.videogame && this.state.Details.videogame.name}
                    
                    </p>
                    <hr></hr>
                    <div className="row">
                     <div className="col align-self-center">
                        <Card className="m-2" style={{ width: '18rem', display: 'inline-block'}}>
                            <Card.Body>
                                <Card.Text>{this.state.Details && this.state.Details.series && this.state.Details.series[0].full_name}</Card.Text>
                                <Card.Text>From: {this.state.Details && this.state.Details.series && this.state.Details.series[0].begin_at}</Card.Text>

                            </Card.Body>
                            
                        </Card>    
                    </div> 
                    </div>
       
                </div>
                
                       
                   
    
                
            </div>
        );
    
    }
}
export default DetailsLeague;
