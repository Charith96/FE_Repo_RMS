import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'react-bootstrap';

const BootstrapCalendar = ({ tileContent }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const renderHeader = () => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const handlePrevMonth = () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    return (
      <div className="calendar-header d-flex justify-content-between align-items-center mb-3" style={{ padding: '1rem', backgroundColor: '#f1f1f1' }}>
        <Button variant="primary" onClick={handlePrevMonth}>Prev</Button>
        <h5>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h5>
        <Button variant="primary" onClick={handleNextMonth}>Next</Button>
      </div>
    );
  };

  const renderDays = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <Row className="calendar-days" style={{ display: 'flex', flexWrap: 'wrap' }}>
        {days.map(day => (
          <Col key={day} className="calendar-day text-center" style={{ flex: '1 0 14.28%', padding: '0.5rem', textAlign: 'center', border: '1px solid #ddd' }}>
            {day}
          </Col>
        ))}
      </Row>
    );
  };

  const renderDates = () => {
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const daysInMonth = [];

    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      daysInMonth.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
    }

    const emptyDays = new Array(firstDayOfMonth.getDay()).fill(null);

    return (
      <Row className="calendar-dates" style={{ display: 'flex', flexWrap: 'wrap' }}>
        {emptyDays.map((_, index) => (
          <Col key={index} className="calendar-date empty" style={{ flex: '1 0 14.28%', padding: '0.5rem', textAlign: 'center', border: '1px solid #ddd', backgroundColor: 'transparent' }}></Col>
        ))}
        {daysInMonth.map(date => (
          <Col key={date.toISOString()} className="calendar-date" style={{ flex: '1 0 14.28%', padding: '0.5rem', textAlign: 'center', border: '1px solid #ddd' }}>
            <div className="date-number" style={{ fontWeight: 'bold' }}>{date.getDate()}</div>
            {tileContent({ date })}
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <div className="bootstrap-calendar" style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
      {renderHeader()}
      {renderDays()}
      {renderDates()}
    </div>
  );
};

BootstrapCalendar.propTypes = {
  tileContent: PropTypes.func.isRequired,
};

export default BootstrapCalendar;
