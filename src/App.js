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

  componentDidMount(){
    this.getFinanceEntries();
  }

  async getFinanceEntries(){
    const response = await fetch('http://localhost:5000/api/budget',{
      mode: 'cors',
      method: 'GET'
    });
    const responseJson = await response.json();
    this.setState({entries: responseJson});
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
    fetch('http://localhost:5000/api/budget', {
      method: 'post',
      body: data,
      headers: {
        "Content-type": "application/json"
      }
    }).then(data => {
      this.getFinanceEntries();
    })
  }

  handleDelete(e, id){
    e.preventDefault();
    console.log('id is: ', id)
    fetch(`http://localhost:5000/api/budget/${id}`, {
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
    fetch(`http://localhost:5000/api/budget/${id}`, {
      method: 'put',
      body: data,
      headers: {
        "Content-type": "application/json"
      }
  }).then(data => {
    this.getFinanceEntries();
    })
  }

  render() {
    const financeEntries = this.state.entries.map(e => 
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
