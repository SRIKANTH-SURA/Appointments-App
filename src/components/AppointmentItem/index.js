import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, onToggleStar} = props
  const {id, title, date, isStared} = appointmentDetails

  const onClickStar = () => {
    onToggleStar(id)
  }

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  const appointmentDate = new Date(date)
  const getDate = appointmentDate.getDate()
  const getMonth = monthNames[appointmentDate.getMonth()]
  const getYear = appointmentDate.getFullYear()
  const getDay = days[appointmentDate.getDay()]

  const starImgUrl = isStared
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="appointment-item">
      <div className="appointment-title-container">
        <p className="appointment-title">{title}</p>
        <button className="star-img-btn" type="button" data-testid="star">
          <img src={starImgUrl} alt="star" onClick={onClickStar} />
        </button>
      </div>
      <p className="appointment-date">
        Date: {`${getDate} ${getMonth} ${getYear}, ${getDay}`}
      </p>
    </li>
  )
}

export default AppointmentItem
