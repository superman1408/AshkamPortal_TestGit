import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useDispatch } from "react-redux";
import { presentList } from "../../../action/posts";

const AbsentDetails = ({ posts, currentId }) => {
  const [value, setValue] = React.useState(false);

  const dispatch = useDispatch();
  // const [checkedAbsent, setCheckedAbsent] = React.useState(false);

  // useEffect(() => {
  //   dispatch(presentList(posts, currentId));
  // }, [dispatch]);

  const [formData, setFormData] = useState({
    presentStatus: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    await dispatch(presentList(formData, currentId))
      .then(() => {
        alert("Successfully Added!");

        // Update the state or perform any necessary updates instead of reloading
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsSubmitting(false); // Reset the form submission state
      });

    window.location.reload();
  };

  return (
    <Grid
      sx={{
        // display: "flex",
        padding: "10px",
        width: "100vh",
        backgroundColor: "white",
        // borderRadius: "15px",
        // border: "1px solid lightgray",
        margin: "0px 5px 2px 5px",

        "@media (max-width: 600px)": {
          display: "flex",
          margin: "0px 0px 0px 0px",
        },
      }}
    >
      <form className="time-sheet-form" onSubmit={handleSubmit}>
        <div
          className="form-group"
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {posts.map((post, index) => {
                if (post._id === currentId) {
                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">
                          {post.firstName + " " + post.lastName}
                        </FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              presentStatus: e.target.value,
                            })
                          }
                        >
                          <FormControlLabel
                            value="true"
                            control={<Radio />}
                            label="Present"
                          />
                          <FormControlLabel
                            value="false"
                            control={<Radio />}
                            label="Absent"
                          />
                        </RadioGroup>
                      </FormControl>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            float: "right",
            // marginTop:
          }}
        >
          <button style={{ fontFamily: "Roboto" }} type="submit">
            Submit
          </button>
        </div>
      </form>
    </Grid>
  );
};

export default AbsentDetails;
