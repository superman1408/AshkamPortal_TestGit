// import React from "react";
// import { WiDayCloudy } from "react-icons/wi";

// import { Grid, Typography, Card, useTheme } from "@mui/material";

// const TimeDate = () => {
//   const theme = useTheme();

//   const date = new Date();
//   console.log(date);

//   return (
//     <div style={{ display: "flex", flex: 1 }}>
//       <Card
//         elevation={6}
//         sx={{
//           display: "flex",
//           backdropFilter: "blur(8px)",
//           // background: "linear-gradient(145deg, #ffffffcc, #f3f4f6cc)",
//           background: "smokewhite",
//           maxWidth: "500px",
//           flexDirection: "column",
//           marginLeft: "20px",
//           height: "150px",
//           padding: "10px",
//           boxShadow: 1,
//           borderRadius: "10px",
//           overflow: "hidden",
//           position: "relative", // Set position to relative
//           flex: 1,
//           border: " solid rgba(255, 255, 255, 0.3)",
//           transition: "all 0.2s ease-in-out",
//           "@media (max-width: 600px)": {
//             display: "flex",
//             margin: "20px 0px 0px 0px",
//             width: "40vh",
//           },
//           "&:hover": {
//             transform: "scale(1.02)",
//             boxShadow: theme.shadows[6],
//           },
//         }}
//       >
//         <Grid sx={{ display: "flex", flexDirection: "column" }}>
//           <Grid sx={{ display: "flex", flexDirection: "row" }}></Grid>
//           <div>
//             <Grid
//               sx={{
//                 display: "flex",
//                 flexDirection: "row",
//                 justifyContent: "space-evenly",
//                 padding: "20px",
//               }}
//             >
//               <WiDayCloudy
//                 size={50}
//                 color="#94a3b8"
//                 style={{ marginBottom: "8px" }}
//               />

//               <div style={{ display: "flex", flexDirection: "column" }}>
//                 <Typography
//                   variant="h5"
//                   fontWeight={600}
//                   color="#16355d"
//                   fontFamily="Roboto"
//                   sx={{
//                     textTransform: "capitalize",
//                     letterSpacing: "0.5px",
//                   }}
//                 >
//                   {date.toLocaleDateString("en-US", {
//                     weekday: "long",
//                     year: "numeric",
//                     day: "2-digit",
//                     month: "long",
//                   })}
//                 </Typography>

//                 <Typography
//                   variant="subtitle1"
//                   fontWeight={600}
//                   fontFamily="Roboto"
//                   color="#16355d"
//                   sx={{
//                     marginTop: "4px",
//                   }}
//                 >
//                   {date.toLocaleTimeString([], {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })}
//                 </Typography>
//               </div>
//             </Grid>
//           </div>
//         </Grid>
//       </Card>
//     </div>
//   );
// };

// export default TimeDate;

// import React, { useEffect, useState } from "react";
// import {
//   WiDayCloudy,
//   WiRain,
//   WiSnow,
//   WiDaySunny,
//   WiCloud,
//   WiThunderstorm,
// } from "react-icons/wi";
// import { Grid, Typography, Card, useTheme } from "@mui/material";

// const API_KEY = "fd60eb012e8131bbeecba0be01ff2132"; // Replace with your OpenWeatherMap API key

// const TimeDate = () => {
//   const theme = useTheme();
//   const [date, setDate] = useState(new Date());
//   const [weather, setWeather] = useState(null);
//   const [city] = useState("Ranchi,IN"); // Default fallback

//   // Update time every second
//   useEffect(() => {
//     const timer = setInterval(() => setDate(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   // Fetch weather
//   useEffect(() => {
//     const fetchWeather = async () => {
//       try {
//         const res = await fetch(
//           `https://api.openweathermap.org/data/2.5/weather?q=Ranchi,IN&units=metric&appid=${API_KEY}`
//         );
//         const data = await res.json();
//         console.log("Weather data:", data);
//         if (data.cod === 200) setWeather(data);
//       } catch (err) {
//         console.error("Weather fetch error:", err);
//       }
//     };
//     fetchWeather();
//   }, []);

//   // Pick icon
//   const getWeatherIcon = (main) => {
//     switch (main) {
//       case "Clear":
//         return <WiDaySunny size={50} color="#ffb300ff" />; // warm sunny yellow
//       case "Clouds":
//         return <WiCloud size={50} color="#7f868aff" />; // soft gray-blue
//       case "Rain":
//         return <WiRain size={50} color="#2089dfff" />; // calm sky blue
//       case "Snow":
//         return <WiSnow size={50} color="#81D4FA" />; // icy light blue
//       case "Thunderstorm":
//         return <WiThunderstorm size={50} color="#332623ff" />; // deep brown
//       default:
//         return <WiDayCloudy size={50} color="#90A4AE" />; // neutral gray-blue
//     }
//   };

//   // Pick background gradient
//   const getBackground = (main) => {
//     switch (main) {
//       case "Clear":
//         return {
//           bg: "linear-gradient(135deg, #FFECB3, #ffffffff)",
//           text: "#16355d",
//         }; // dark text
//       case "Clouds":
//         return {
//           bg: "linear-gradient(135deg, #a7b5bd, #ffffffff)",
//           text: "#ffffff",
//         }; // light text
//       case "Rain":
//         return {
//           bg: "linear-gradient(135deg, #BBDEFB, #ffffffff)",
//           text: "#16355d",
//         }; // dark text
//       case "Snow":
//         return {
//           bg: "linear-gradient(135deg, #B3E5FC, #ffffffff)",
//           text: "#16355d",
//         }; // dark text
//       case "Thunderstorm":
//         return {
//           bg: "linear-gradient(135deg, #6a8491ff, #ffffffff)",
//           text: "#ffffff",
//         }; // light text
//       default:
//         return {
//           bg: "linear-gradient(135deg, #F3F4F6, #E5E7EB)",
//           text: "#16355d",
//         };
//     }
//   };
//   const weatherMain = weather?.weather?.[0]?.main || "Default";
//   const { bg, text } = getBackground(weatherMain);

//   return (
//     // <div style={{ display: "flex", flex: 1 }}>
//     <Card
//       elevation={6}
//       sx={{
//         display: "flex",
//         backdropFilter: "blur(8px)",
//         background: bg,
//         color: text, // dynamic text color
//         maxWidth: "500px",
//         flexDirection: "column",
//         marginLeft: "20px",
//         height: "180px",
//         padding: "15px",
//         borderRadius: "16px",
//         overflow: "hidden",
//         flex: 1,
//         color: "#16355d",
//         border: "solid rgba(255, 255, 255, 0.3)",
//         transition: "all 0.3s ease-in-out",
//         "&:hover": {
//           transform: "scale(1.03)",
//           boxShadow: theme.shadows[6],
//         },
//       }}
//     >
//       <Grid
//         sx={{
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         {/* Left: Time & Date */}
//         <div style={{ display: "flex", flexDirection: "column" }}>
//           <Typography
//             variant="h5"
//             fontWeight={600}
//             fontFamily="Roboto"
//             sx={{ textTransform: "capitalize", letterSpacing: "0.5px" }}
//           >
//             {date.toLocaleDateString("en-US", {
//               weekday: "long",
//               year: "numeric",
//               month: "long",
//               day: "2-digit",
//             })}
//           </Typography>

//           <Typography
//             variant="subtitle1"
//             fontWeight={600}
//             fontFamily="Roboto"
//             sx={{ marginTop: "4px" }}
//           >
//             {date.toLocaleTimeString([], {
//               hour: "2-digit",
//               minute: "2-digit",
//               second: "2-digit",
//             })}
//           </Typography>
//         </div>

//         {/* Right: Weather */}
//         {weather && weather.weather && weather.weather.length > 0 ? (
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//             }}
//           >
//             {getWeatherIcon(weather.weather[0].main)}
//             <Typography variant="subtitle1" fontWeight={600}>
//               {Math.round(weather.main.temp)}°C
//             </Typography>
//             <Typography variant="caption" color="#333">
//               {weather.name}
//             </Typography>
//           </div>
//         ) : (
//           <Typography variant="caption" color="#555">
//             Loading weather...
//           </Typography>
//         )}
//       </Grid>
//     </Card>
//     // </div>
//   );
// };

// export default TimeDate;

import React, { useEffect, useState } from "react";
import {
  WiDayCloudy,
  WiRain,
  WiSnow,
  WiDaySunny,
  WiCloud,
  WiThunderstorm,
} from "react-icons/wi";
import { Grid, Typography, Card, useTheme } from "@mui/material";

const API_KEY = "fd60eb012e8131bbeecba0be01ff2132"; // Replace with your OpenWeatherMap API key

const TimeDate = () => {
  const theme = useTheme();
  const [date, setDate] = useState(new Date());
  const [weather, setWeather] = useState(null);
  const [city] = useState("Ranchi,IN"); // Default fallback

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch weather
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        const data = await res.json();
        console.log("Weather data:", data);
        if (data.cod === 200) setWeather(data);
      } catch (err) {
        console.error("Weather fetch error:", err);
      }
    };
    fetchWeather();
  }, [city]);

  // Pick icon
  const getWeatherIcon = (main, description) => {
    if (main === "Clear" || description.includes("clear")) {
      return <WiDaySunny size={50} color="#ffb300ff" />;
    }

    if (main === "Clouds") {
      if (description.includes("few")) {
        return <WiDaySunny size={50} color="#ffb300ff" />; // few clouds = sunny
      }
      return <WiCloud size={50} color="#7f868aff" />;
    }

    switch (main) {
      case "Rain":
        return <WiRain size={50} color="#2089dfff" />;
      case "Snow":
        return <WiSnow size={50} color="#81D4FA" />;
      case "Thunderstorm":
        return <WiThunderstorm size={50} color="#332623ff" />;
      default:
        return <WiDayCloudy size={50} color="#90A4AE" />;
    }
  };

  // Pick background gradient
  const getBackground = (main, description) => {
    if (main === "Clear" || description.includes("clear")) {
      return {
        bg: "linear-gradient(135deg, #FFECB3, #ffffff)",
        text: "#16355d",
      };
    }

    if (main === "Clouds") {
      if (description.includes("few")) {
        return {
          bg: "linear-gradient(135deg, #FFE082, #ffffff)", // bright for few clouds
          text: "#16355d",
        };
      }
      if (description.includes("overcast") || description.includes("broken")) {
        return {
          bg: "linear-gradient(135deg, #90A4AE, #CFD8DC)", // grayish
          text: "#16355d",
        };
      }
      return {
        bg: "linear-gradient(135deg, #B0BEC5, #ffffff)",
        text: "#16355d",
      };
    }

    switch (main) {
      case "Rain":
        return {
          bg: "linear-gradient(135deg, #BBDEFB, #ffffff)",
          text: "#16355d",
        };
      case "Snow":
        return {
          bg: "linear-gradient(135deg, #B3E5FC, #ffffff)",
          text: "#16355d",
        };
      case "Thunderstorm":
        return {
          bg: "linear-gradient(135deg, #455A64, #CFD8DC)",
          text: "#16355d",
        };
      default:
        return {
          bg: "linear-gradient(135deg, #F3F4F6, #E5E7EB)",
          text: "#16355d",
        };
    }
  };

  const weatherMain = weather?.weather?.[0]?.main || "Default";
  const weatherDesc = weather?.weather?.[0]?.description || "";
  const { bg, text } = getBackground(weatherMain, weatherDesc);

  return (
    <Card
      elevation={6}
      sx={{
        display: "flex",
        backdropFilter: "blur(8px)",
        background: bg,
        color: text, // dynamic text color
        maxWidth: "500px",
        flexDirection: "column",
        marginLeft: "20px",
        height: "180px",
        padding: "15px",
        borderRadius: "16px",
        overflow: "hidden",
        flex: 1,
        border: "solid rgba(255, 255, 255, 0.3)",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: theme.shadows[6],
        },
      }}
    >
      <Grid
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Left: Time & Date */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Typography
            variant="h5"
            fontWeight={600}
            fontFamily="Roboto"
            sx={{ textTransform: "capitalize", letterSpacing: "0.5px" }}
          >
            {date.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "2-digit",
            })}
          </Typography>

          <Typography
            variant="subtitle1"
            fontWeight={600}
            fontFamily="Roboto"
            sx={{ marginTop: "4px" }}
          >
            {date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </Typography>
        </div>

        {/* Right: Weather */}
        {weather && weather.weather && weather.weather.length > 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {getWeatherIcon(weatherMain, weatherDesc)}
            <Typography variant="subtitle1" fontWeight={600}>
              {Math.round(weather.main.temp)}°C
            </Typography>
            <Typography variant="caption" color="#333">
              {weather.name}
            </Typography>
            <Typography variant="caption" sx={{ fontStyle: "italic" }}>
              {weatherDesc}
            </Typography>
          </div>
        ) : (
          <Typography variant="caption" color="#555">
            Loading weather...
          </Typography>
        )}
      </Grid>
    </Card>
  );
};

export default TimeDate;
