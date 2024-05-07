import React from 'react'

const payslipDownload = () => {
  return (
    <div><Grid sx={{ display: "flex", marginLeft: "70px" }}>
    <Grid>
      <Card sx={{ padding: "10px" }}>
        <form onSubmit={handleSubmit} className="time-sheet-form">
          <div className="form-group">
            <label
              style={{ color: "#16355d", fontFamily: "Roboto" }}
              htmlFor="projectCode"
            >
              Employee ID
            </label>
            <label
              style={{ color: "#16355d", fontFamily: "Roboto" }}
              htmlFor="projectCode"
            >
              {}
            </label>
          </div>
          <div className="form-group">
            <label
              style={{ color: "#16355d", fontFamily: "Roboto" }}
              htmlFor="projectCode"
            >
              Employee Name
            </label>

            <label
              style={{ color: "#16355d", fontFamily: "Roboto" }}
              htmlFor="projectCode"
            >
              {}
            </label>
          </div>
          <div className="form-group">
            <label
              style={{ color: "#16355d", fontFamily: "Roboto" }}
              htmlFor="projectCode"
            >
              Title:
            </label>

            <label style={{ color: "#16355d", fontFamily: "Roboto" }}>
              {}
            </label>
            <button style={{ marginTop: "20px" }}>Download</button>
          </div>
        </form>
      </Card>
    </Grid>
    <Grid></Grid>
  </Grid>
</div>
  )
}

export default payslipDownload