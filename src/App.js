import React from 'react';
import logo from './logo.svg';
import './App.css';
import { render } from '@testing-library/react';

class App extends React.Component {

  state = {
    weather: [],
    weatherInst: {
      time: '16:00:00',
      city: 'New York',
      temparature: '16℃'
    }
  }

  componentDidMount() {
    this.getWeather();
  }

  getWeather = _ => {
    fetch('http://localhost:4000/weather')
      .then(response => response.json())
      .then(response => {
        this.setState({ weather: response.data })
      })
      .catch(err => console.log(err))
  }

  addWeather = _ => {
    const { weatherInst } = this.state;
    fetch(`http://localhost:4000/weather/add?time=${weatherInst.time}&city=${weatherInst.city}&temparature=${weatherInst.temparature}`)
      .then(this.getWeather)
      .catch(err => console.log(err))
  }

  renderWeather = ({ id, time, city, temparature }) => <div key={id}>{city}</div>

  render() {
    const { weather, weatherInst } = this.state;

    return (
      <div className="App">
        {weather.map(this.renderWeather)}

        <div>
          <input value={weatherInst.time} onChange={e => this.setState({ weatherInst: { ...weatherInst, time: e.target.value } })}></input>
          <input value={weatherInst.city} onChange={e => this.setState({ weatherInst: { ...weatherInst, city: e.target.value } })}></input>
          <input value={weatherInst.temparature} onChange={e => this.setState({ weatherInst: { ...weatherInst, temparature: e.target.value } })}></input>
          <button onClick={this.addWeather}>Add Weather</button>
        </div>
      </div>
    );
  }

}

export default App;
