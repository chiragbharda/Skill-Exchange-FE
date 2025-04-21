import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import Navbar from "../common/Navbar";
 // Make sure this is your User Navbar

const UserDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios
      .get("/allskill")
      .then((res) => setStats(res.data.data))
      .catch((err) => console.error("Error fetching skills:", err));
  }, []);

  if (!stats) return <div className="text-center mt-5">Loading dashboard...</div>;

  // Prepare chart data: skills with highest demand (to learn)
  const skillsToLearnCount = {};
  stats.forEach((user) => {
    user.skillsToLearn?.forEach((skill) => {
      skillsToLearnCount[skill] = (skillsToLearnCount[skill] || 0) + 1;
    });
  });

  const chartData = Object.entries(skillsToLearnCount)
    .map(([skill, count]) => ({ name: skill, value: count }))
    .sort((a, b) => b.value - a.value); // sort descending by demand

  return (
    <>
      <Navbar/>
      <Container sx={{ mt: 5 }}>
        <Typography variant="h4" mb={4}>
          Skill Demand
        </Typography>

        {/* Skills Demand Chart */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" mb={2}>
                  Most Demanded Skills to Learn
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="value" fill={blue[500]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default UserDashboard;
