import React from "react";

function CustomerCurrentReservations() {
  const data = [
    {
      id: 1,
      reservationId: "R123",
      itemId: "I567",
      date: "2024-02-15",
      timeDuration: "2 hours",
    },
    {
      id: 2,
      reservationId: "R456",
      itemId: "I789",
      date: "2024-02-16",
      timeDuration: "3 hours",
    },
    {
      id: 3,
      reservationId: "R789",
      itemId: "I123",
      date: "2024-02-17",
      timeDuration: "1 hour",
    },
  ];

  return (
    <div className="App">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Reservation ID</th>
            <th scope="col">Item ID</th>
            <th scope="col">Date</th>
            <th scope="col">Time Duration</th>
            <th scope="col">Select</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.reservationId}</td>
              <td>{item.itemId}</td>
              <td>{item.date}</td>
              <td>{item.timeDuration}</td>
              <td style={{ display: "flex", alignItems: "center" }}>
                <input type="checkbox" style={{ marginRight: "5px" }} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerCurrentReservations;
