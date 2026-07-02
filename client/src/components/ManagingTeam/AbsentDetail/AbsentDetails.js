import React, { useState } from "react";
import { Button, Grid } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useDispatch } from "react-redux";
import { presentList } from "../../../action/posts";

const AbsentDetails = ({ posts, currentId }) => {
  const dispatch = useDispatch();

  const [nameCount, setNameCount] = useState(0);

  React.useEffect(() => {
    const count = posts.filter((post) => post._id === currentId).length;
    setNameCount(count);
  }, [posts, currentId]);

  const [formData, setFormData] = useState({
    presentStatus: "",
    nameCount: "",
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
        padding: "10px",
        width: "100%",
        backgroundColor: "white",
        margin: "0px 5px 2px 5px",
      }}
    >
      <form className="time-sheet-form" onSubmit={handleSubmit}>
        <div
          className="form-group"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {posts.map((post, index) => {
            if (post._id === currentId) {
              return (
                <FormControl key={index} fullWidth>
                  <Grid sx={{ display: "flex" }}>
                    <FormLabel>
                      {post.firstName + " " + post.lastName}
                    </FormLabel>

                    <span
                      style={{
                        backgroundColor:
                          post.presentStatus === "true"
                            ? "green"
                            : post.presentStatus === "false"
                            ? "red"
                            : "orange",
                        color: "white",
                        padding: "4px 8px",
                        borderRadius: "8px",
                        marginLeft: "20px",
                      }}
                    >
                      {post.presentStatus === "true"
                        ? "Present"
                        : post.presentStatus === "false"
                        ? "Absent"
                        : "Unknown"}
                    </span>
                  </Grid>
                  <RadioGroup
                    row
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
              );
            }
          })}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            sx={{
              bgcolor: "#16355d",
              width: { xs: "100%", sm: "auto" },
            }}
          >
            Submit
          </Button>
        </div>
      </form>
    </Grid>
  );
};

export default AbsentDetails;
