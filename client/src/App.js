import React,{Component} from 'react';
import * as Rs from 'reactstrap';
import Weather from './Weather';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      weather: null,
      cityList: [],
      newCityName: '' 
    }
  }
  
  getCityList = () => {
    fetch('/api/cities')
    .then(res => res.json())
    .then(res => {
      var cityList = res.map(r => r.city_name);
      this.setState({ cityList });
    })
  };

  handleInputChange = (e) => {
    this.setState({ newCityName: e.target.value });
  };

  handleAddCity = () => {
    fetch('/api/cities',{
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city: this.state.newCityName })
    })
    .then(res => res.json())
    .then(res => {
     this.getCityList();
     this.setState({ newCityName: '' });
    })
  };

  getWeather = (city) => {
    fetch(`/api/weather/${city}`)
    .then(res => res.json())
    .then(weather => {
      this.setState({ weather });
    })
  };

  handleChangeCity = (e) => {
    this.getWeather(e.target.value);
  };

  componentDidMount() {
    this.getCityList();
  };

  render() {
  return (
    <div>
      <Rs.Container fluid className='centered'>
        <Rs.Navbar dark color='dark'>
          <Rs.NavbarBrand href='/'>Weather App</Rs.NavbarBrand>
        </Rs.Navbar>
        <Rs.Row>
          <Rs.Col>
            <Rs.Jumbotron>
              <h1 className='display-3'>Weather App</h1>
              <p className='lead'>The current weather for your favorite cities!</p>
              <Rs.InputGroup>
              <Rs.Input
                placeholder='New city name...'
                value={this.state.newCityName}
                onChange={this.handleInputChange}
              />
              <Rs.InputGroupAddon addonType='append'>
              <Rs.Button color='primary' onClick={this.handleAddCity}>Add City</Rs.Button>
              </Rs.InputGroupAddon>
            </Rs.InputGroup>
            </Rs.Jumbotron>
           
          </Rs.Col>
        </Rs.Row>
        <Rs.Row>
          <Rs.Col>
            <h1 className='display-5'>Current Weather</h1>
            <Rs.FormGroup>
              <Rs.Input type='select' onChange={this.handleChangeCity}>
                { this.state.cityList.length === 0 ? <option>No cities found</option> : <option>Select a city..</option> }
                { this.state.cityList.map((city,i) => <option key={i}>{city}</option>) }
              </Rs.Input>
            </Rs.FormGroup>
          </Rs.Col>
        </Rs.Row>
        <Weather data={this.state.weather} />
      </Rs.Container>
    </div>
  );
}
}

export default App;
