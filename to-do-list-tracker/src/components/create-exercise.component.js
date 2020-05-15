import React, { Component} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const List = props => (
  <tr>
    <td>{props.list.topic}</td>
    <td>{props.list.description}</td>
    <td>{props.list.date.substring(0,10)}</td>
    <td>
      <a href="#" onClick={()=>{props.updateList(props.list._id)}}>edit</a> | <a href="#" onClick={() => { props.deleteList(props.list._id) }}>delete</a>
    </td>
  </tr>
)


export default class CreateList extends Component {
  constructor(props) {
    super(props);

    this.onChangeTopic = this.onChangeTopic.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.deleteList = this.deleteList.bind(this)
    this.updateList = this.updateList.bind(this)

    this.state = {
      topic: '',
      description: '',
      date:null, 
      lists: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8000/lists/')
    .then(response => {
      this.setState({ lists: response.data })
    })
    .catch((error) => {
      console.log(error);
    })
    

  }

  onChangeTopic(e) {
    this.setState({
      topic: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: new Date(date)
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const list = {
      topic: this.state.topic,
      description: this.state.description,
      date: new Date(this.state.date)
    }

    console.log(list);

    axios.post('http://localhost:8000/lists/add', list)
      .then(res => console.log(res.data));
    
      axios.get('http://localhost:8000/lists/')
      .then(response => {
        this.setState({ lists: response.data })
      })
      .catch((error) => {
        console.log(error);
      })

      this.setState({
        topic : '',
        description : '',
        date : null
      })
  }


  deleteList(id) {
    axios.delete('http://localhost:8000/lists/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      lists: this.state.lists.filter(el => el._id !== id)
    })
  }

updateList(id){
  axios.get('http://localhost:8000/lists/'+id)
  .then(
    response => {
    this.setState({
      topic: response.data.topic,
      description: response.data.description,
      date: new Date(response.data.date)
    })
  }
  )
  .catch(function (error) {
    console.log(error);
  })
  this.deleteList(id);


  const list = {
    topic: this.state.topic,
    description: this.state.description,
    date: new Date(this.state.date)
  }

  console.log(list);

  axios.put('http://localhost:8000/lists/update/'+id,list)
    .then(res => console.log(res.data));
}

  todoList() {
    return this.state.lists.map(currentlist => {
      return <List list={currentlist} updateList={this.updateList} deleteList={this.deleteList} key={currentlist._id}/>;
    })
  }

  render() {
    return (
    <div>
      <h3>Create New list Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Topic: </label>
          <input ref="userInput"
              required
              className="form-control"
              value={this.state.topic}
              onChange={this.onChangeTopic}
              />
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
        </div>
      </form>

      <h3>LISTS</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Topic</th>
              <th>Description</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.todoList() }
          </tbody>
        </table>

    </div>
    )
  }
}