import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentList: [],
    title: '',
    date: '',
    isFilterActive: false,
  }

  onClickStaredBtn = () => {
    this.setState(prevState => ({
      isFilterActive: !prevState.isFilterActive,
    }))
  }

  getFilteredList = () => {
    const {isFilterActive, appointmentList} = this.state

    if (isFilterActive) {
      return appointmentList.filter(each => each.isStared === true)
    }
    return appointmentList
  }

  onToggleStar = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isStared: !eachAppointment.isStared}
        }
        return eachAppointment
      }),
    }))
  }

  onAddAppointment = () => {
    const {title, date} = this.state
    const newAppointment = {
      id: uuidv4(),
      title,
      date,
      isStared: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  render() {
    const {title, date, isFilterActive} = this.state
    const filterActiveClassName = isFilterActive
      ? 'filter-active'
      : 'filter-inactive'
    const filteredList = this.getFilteredList()

    return (
      <div className="appointments-app">
        <div className="app-content">
          <div className="row">
            <div className="col-6">
              <h1 className="heading">Add Appointment</h1>
              <form className="appointment-form">
                <div className="form-fields">
                  <label className="input-label" htmlFor="title">
                    Title
                  </label>
                  <input
                    className="form-input"
                    id="title"
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={this.onChangeTitle}
                  />
                </div>
                <div className="form-fields">
                  <label className="input-label" htmlFor="date">
                    Date
                  </label>
                  <input
                    className="form-input"
                    id="date"
                    type="date"
                    placeholder="dd/mm/yyyy"
                    value={date}
                    onChange={this.onChangeDate}
                  />
                </div>
                <div className="form-fields">
                  <button
                    className="add-btn"
                    type="button"
                    onClick={this.onAddAppointment}
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
            <div className="col-6 img-container">
              <img
                className="appointments-img"
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>
          <div className="appointment-items-container">
            <div className="appointment-heading">
              <h1 className="heading">Appointments</h1>
              <button
                className={`stared-btn ${filterActiveClassName}`}
                type="button"
                onClick={this.onClickStaredBtn}
              >
                Starred
              </button>
            </div>
            <ul className="appointment-list">
              {filteredList.map(eachItem => (
                <AppointmentItem
                  appointmentDetails={eachItem}
                  onToggleStar={this.onToggleStar}
                  key={eachItem.id}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
