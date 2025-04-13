import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { blue, green, orange } from "@mui/material/colors";
import AdminNavbar from "./AdminNavbar";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // Axios GET request to fetch the data
    axios
      .get("/allskill")  // Replace with the correct API endpoint
      .then((res) => {
        console.log("Fetched stats data:", res.data.data);
        setStats(res.data.data);
      })
      .catch((err) => {
        console.error("Stats fetch error:", err);
      });
  }, []);

  if (!stats) return <div className="text-center mt-5">Loading dashboard...</div>;

  // Step 1: Collect all skills to learn
  const skillsToLearnCount = {};

  stats.forEach((user) => {
    if (user.skillsToLearn) {
      user.skillsToLearn.forEach((skill) => {
        if (skillsToLearnCount[skill]) {
          skillsToLearnCount[skill] += 1;
        } else {
          skillsToLearnCount[skill] = 1;
        }
      });
    }
  });

  // Step 2: Convert the skills object into an array for the chart
  const chartData = Object.entries(skillsToLearnCount).map(([skill, count]) => ({
    name: skill,
    value: count,
  }));

  // Step 3: Sort the skills by demand (highest count first)
  chartData.sort((a, b) => b.value - a.value);

  return (
    <>
      <AdminNavbar />
      <div className="container mt-5">
        <h2 className="mb-4">Admin Dashboard</h2>

        {/* Stats Cards */}
        <Grid container spacing={3} mb={5}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ backgroundColor: blue[500], color: "white" }}>
              <CardContent>
                <Typography variant="h6">Total Users</Typography>
                <Typography variant="h4">{stats.length}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ backgroundColor: green[500], color: "white" }}>
              <CardContent>
                <Typography variant="h6">Total Skills</Typography>
                <Typography variant="h4">{stats.reduce((acc, user) => acc + (user.skillsToLearn ? user.skillsToLearn.length : 0), 0)}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ backgroundColor: orange[500], color: "white" }}>
              <CardContent>
                <Typography variant="h6">Total Connections</Typography>
                <Typography variant="h4">{stats.reduce((acc, user) => acc + (user.userId.connectedUsers ? user.userId.connectedUsers.length : 0), 0)}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Skills Demand Chart */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Skills in High Demand to Learn</Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" barSize={50} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default AdminDashboard;
