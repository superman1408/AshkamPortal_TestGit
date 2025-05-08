import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../action/posts";
import WcIcon from "@mui/icons-material/Wc";
import WomanIcon from "@mui/icons-material/Woman";
import ManIcon from "@mui/icons-material/Man";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#1976d2", "#dc3912"];

const TotalEmployee = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const theme = useTheme();

  const [menCount, setMenCount] = useState(0);
  const [womenCount, setWomenCount] = useState(0);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    if (posts.length > 0) {
      let men = 0;
      let women = 0;
      posts.forEach((post) => {
        if (post.gender === "male") men++;
        else if (post.gender === "female") women++;
      });
      setMenCount(men);
      setWomenCount(women);
    }
  }, [posts]);

  const data = [
    { name: "Men", value: menCount },
    { name: "Women", value: womenCount },
  ];

  return (
    <Card
      elevation={6}
      sx={{
        p: 2,
        backdropFilter: "blur(8px)",
        background: "linear-gradient(145deg, #ffffffcc, #f3f4f6cc)",
        borderRadius: 3,
        transition: "0.3s",
        height: "100%",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: theme.shadows[6],
        },
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} display="flex" alignItems="center">
            <IconButton sx={{ color: "#16355d" }}>
              <WcIcon />
            </IconButton>
            <Typography
              variant="h6"
              fontWeight={600}
              color="#16355d"
              fontFamily="Roboto"
            >
              Total Employees
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box display="flex" flexDirection="column" gap={1}>
              <Box display="flex" alignItems="center">
                <ManIcon color="primary" />
                <Typography ml={1}>{menCount}</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <WomanIcon sx={{ color: COLORS[1] }} />
                <Typography ml={1}>{womenCount}</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={8}>
            <ResponsiveContainer p={10} width="100%" height={200}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  innerRadius={30}
                  fill="#8884d8"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value}`, `${name}`]} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TotalEmployee;
