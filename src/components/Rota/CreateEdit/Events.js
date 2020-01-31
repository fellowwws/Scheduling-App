import React from "react";
import { Input } from "reactstrap";

const styles = {
  th: {
    padding: "2px"
  },
  input: {
    textAlign: "center",
    height: "75px",
    border: "none",
    borderRadius: "0"
  }
};

function Events({ events, handleChange }) {
  const [MON, TUE, WED, THU, FRI, SAT, SUN] = events;
  return (
    <tr>
      <th className="bg-light"></th>
      <th style={styles.th}>
        {/* MONDAY */}
        <Input
          style={styles.input}
          type="text"
          placeholder="EVENT"
          value={MON}
          data-index="0"
          onChange={handleChange}
        />
      </th>
      <th style={styles.th}>
        {/* TUESDAY */}
        <Input
          style={styles.input}
          type="text"
          placeholder="EVENT"
          value={TUE}
          data-index="1"
          onChange={handleChange}
        />
      </th>
      <th style={styles.th}>
        {/* WEDNESDAY */}
        <Input
          style={styles.input}
          type="text"
          placeholder="EVENT"
          value={WED}
          data-index="2"
          onChange={handleChange}
        />
      </th>
      <th style={styles.th}>
        {/* THURSDAY */}
        <Input
          style={styles.input}
          type="text"
          placeholder="EVENT"
          value={THU}
          data-index="3"
          onChange={handleChange}
        />
      </th>
      <th style={styles.th}>
        {/* FRIDAY */}
        <Input
          style={styles.input}
          type="text"
          placeholder="EVENT"
          value={FRI}
          data-index="4"
          onChange={handleChange}
        />
      </th>
      <th style={styles.th}>
        {/* SATURDAY */}
        <Input
          style={styles.input}
          type="text"
          placeholder="EVENT"
          value={SAT}
          data-index="5"
          onChange={handleChange}
        />
      </th>
      <th style={styles.th}>
        {/* SUNDAY */}
        <Input
          style={styles.input}
          type="text"
          placeholder="EVENT"
          value={SUN}
          data-index="6"
          onChange={handleChange}
        />
      </th>
    </tr>
  );
}

export default Events;
