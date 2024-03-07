<table
  style={{
    marginLeft: "100px",
    width: "80%",
    borderCollapse: "collapse",
    border: "1px solid black",
  }}
>
  <thead>
    <tr style={{ border: "1px solid black" }}>
      <th style={{ border: "1px solid black", padding: "10px" }}>
        Employee Id:
      </th>
      <td style={{ border: "1px solid black", padding: "10px" }}>
        {user.result.employeeId}
      </td>
      <th style={{ border: "1px solid black", padding: "10px" }}>Name</th>
      <td style={{ border: "1px solid black", padding: "10px" }}>
        {user.result.firstName + " " + user.result.lastName}
      </td>
    </tr>
    {/* Rest of the header rows with similar styles */}
  </thead>
  <tbody>
    {/* Body rows with similar border styles */}
  </tbody>
</table>
