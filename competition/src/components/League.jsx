import React, { Component } from 'react'
import {Card} from 'react-bootstrap'
import '../App.css';
import { Link} from 'react-router-dom';

class League extends Component{
    state={};

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render(){
        return(
           
            <div className="row">
               <div className="col align-self-center">
               <Card className="m-2" style={{ width: '18rem', display: 'inline-block'}}>
                    <Card.Body>
                        <Card.Text>{this.props.league.name}</Card.Text>
                            <Card.Img variant="top" src={this.props.league.image_url+'?token='+process.env.REACT_APP_TOKEN}/>
                    </Card.Body>
                    <Card.Footer>
                        <Link to={'/leagues/'+this.props.league.id}>Détails</Link>
                    </Card.Footer>
                </Card>    
                </div> 
            </div>
     
         
               
        )
    }


}

export default League
