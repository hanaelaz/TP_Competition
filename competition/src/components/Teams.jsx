import { Link } from 'react-router-dom';
import React, { Component } from 'react'
import { Card } from 'react-bootstrap';

class Teams extends Component{
state={};
componentDidMount(){}
componentWillUnmount(){}

render(){
    return(
        <div className="row">
            <div className="col align-self-center">
                <Card className="m-2" style={{width:'18rem', display:'inline-block'}}>
                    <Card.Body>
                        <Card.Text>
                            {this.props.team.name}
                        </Card.Text>
                        <Card.Img variant="top" src={this.props.team.image_url+'?token='+process.env.REACT_APP_TOKEN}/>
                    </Card.Body>
                    <Card.Footer>
                        <Link to={'/teams/'+this.props.team.id}>Détails</Link>
                    </Card.Footer>
                </Card>

            </div>
        </div>
    )
}

}
export default Teams
