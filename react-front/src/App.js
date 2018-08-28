import React, { Component } from 'react';
import FinanceEntry from './components/financeEntry';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      entries: [],
      month: '', 
      homebills: '',
      loans: '',
      grocery: '', 
      eatingout: '', 
      transportationfees: '', 
      shopping: '', 
      medicalbills: ''
    }
    this.getFinanceEntries = this.getFinanceEntries.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  componentDidMount(){ //by the garage
    this.getFinanceEntries(); //grab all the backpack in the car with us and go up to the house
  }

  async getFinanceEntries(){
    const response = await fetch('https://finance-app-fullstack-bfwbspjyyq.now.sh/api/budget',{
      mode: 'cors', //this will tell the front-end and back-end (server) that they are okay to work together
      method: 'GET'
    });
    const responseJson = await response.json();
    this.setState({entries: responseJson}); //get data from fetching localhost:5000 => put it in entries array as Json
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const data = JSON.stringify({
      month: this.state.month,
      homebills: this.state.homebills,
      loans: this.state.loans,
      grocery: this.state.grocery,
      eatingout: this.state.eatingout,
      transportationfees: this.state.transportationfees,
      shopping: this.state.shopping,
      medicalbills: this.state.medicalbills,
    })
    fetch('https://finance-app-fullstack-bfwbspjyyq.now.sh/api/budget', {
      method: 'post',
      body: data,
      headers: {
        "Content-type": "application/json"
      }
    }).then(data => {
      this.getFinanceEntries(); //after posting data, then go get the new update data
    })
  }

  handleDelete(e, id){
    e.preventDefault();
    console.log('id is: ', id)
    fetch(`https://finance-app-fullstack-bfwbspjyyq.now.sh/api/budget/${id}`, {
      method: 'delete'
    }).then(data => {
      this.getFinanceEntries();
    })
  }

  handleUpdate(e, id){
    e.preventDefault();
    const data = JSON.stringify({
      month: this.state.month,
      homebills: this.state.homebills,
      loans: this.state.loans,
      grocery: this.state.grocery,
      eatingout: this.state.eatingout,
      transportationfees: this.state.transportationfees,
      shopping: this.state.shopping,
      medicalbills: this.state.medicalbills,
    })
    console.log('id is: ', id)
    fetch(`https://finance-app-fullstack-bfwbspjyyq.now.sh/api/budget/${id}`, {
      method: 'put',
      body: data,
      headers: { //use header to tell the server what I send to it (text, image, or what type of info I send)
        "Content-type": "application/json"
      }
  }).then(data => {
    this.getFinanceEntries();
    })
  }

  render() {
    const financeEntries = this.state.entries.map(e => //after get all the entries - map and get all the FinanceEntry.js
      <FinanceEntry 
        id={e._id}
        month={e.month} 
        homebills={e.homebills} 
        loans={e.loans}
        grocery={e.grocery}
        eatingout={e.eatingout}
        transportationfees={e.transportationfees}
        shopping={e.shopping}
        medicalbills={e.medicalbills}
        deleteAction={this.handleDelete}
        updateAction={this.handleUpdate}/>
    );
    return (
      <div className="App">
        <h1 className="header">Financial App</h1>
        <form onSubmit={this.handleSubmit} style={{position: 'fixed'}}>
        <input type="text" placeholder="month" onChange={e => this.setState({month: e.target.value})}/>
        <input type="text" placeholder="homebills" onChange={e => this.setState({homebills: e.target.value})}/>
        <input type="text" placeholder="loans" onChange={e => this.setState({loans: e.target.value})}/>
        <input type="text" placeholder="grocery" onChange={e => this.setState({grocery: e.target.value})}/>
        <input type="text" placeholder="eatingout" onChange={e => this.setState({eatingout: e.target.value})}/>
        <input type="text" placeholder="transportationfees" onChange={e => this.setState({transportationfees: e.target.value})}/>
        <input type="text" placeholder="shopping" onChange={e => this.setState({shopping: e.target.value})}/>
        <input type="text" placeholder="medicalbills" onChange={e => this.setState({medicalbills: e.target.value})}/>
        <button type="submit">Submit</button>
        </form>
        <div className="container">
          {financeEntries}
        </div>
      </div>
    );
  }
}

export default App;
