import React from "react";
import Footer from '../Footer';

export default class location extends React.Component {
  state = {
    loading: true,
    people: []
  };

  async componentDidMount() {
    const url = "http://localhost:8000/api/list";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ people: data});
  }

  render() {
    
    return (
      <>
      <div className="location">
        <h1>Locations of battle:</h1>
        {this.state.people.map(person => (
          
            <h1>{person}</h1>
          
        ))}
      </div>
      <Footer/>
      </>
    );
  }
}