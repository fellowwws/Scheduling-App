import React from "react";
import { Table } from "reactstrap";

const styles = {
  table: {
    td: {
      verticalAlign: "middle",
      textAlign: "center",
      minWidth: "75px"
    }
  }
};

function Rota({ rota, shiftTypes }) {
  const showEvents = rota.events.some(e => e !== ""); // true || false

  return (
    <Table bordered striped responsive className="rota">
      <thead>
        <DaysOfTheWeek />
        {showEvents && <Events events={rota.events} />}
      </thead>
      <tbody>
        {Object.keys(rota.body).map((key, i) => (
          <Schedule key={i} employee={rota.body[key]} />
        ))}
      </tbody>
    </Table>
  );
}

function DaysOfTheWeek() {
  const style = "bg-dark text-white text-center";
  return (
    <tr>
      <th className="border-0"></th>
      <th className={style}>MON</th>
      <th className={style}>TUE</th>
      <th className={style}>WED</th>
      <th className={style}>THU</th>
      <th className={style}>FRI</th>
      <th className={style}>SAT</th>
      <th className={style}>SUN</th>
    </tr>
  );
}

const Events = ({ events }) => (
  <tr>
    <th className="bg-light"></th>
    {events.map((event, i) => (
      <th key={i} className="text-center">
        {event}
      </th>
    ))}
  </tr>
);

const Schedule = ({ employee, shiftTypes }) => {
  const { name } = employee;
  return (
    <tr>
      <td>
        {`${name.first}
          ${name.last.toUpperCase()}`}
      </td>
      {employee.schedule.map((shift, i) => (
        <td key={i} style={styles.table.td}>
          {shift}
        </td>
      ))}
    </tr>
  );
};

// function Shift({shift, shiftTypes}) {
//   if( !shift ) {
//     return <td className="text-center"></td> //Empty
//   }
//   let [time, type] = shift.split('@'); //['9-5','can']
//   if( type ) {
//     type = shiftTypes.find(s => s.code === type);
//     return (
//       <td
//         style={{background: type.color}}
//         className="text-center">{time}
//       </td>
//     );
//   }
//   return <td className="text-center">{time}</td>
// }

export default Rota;
