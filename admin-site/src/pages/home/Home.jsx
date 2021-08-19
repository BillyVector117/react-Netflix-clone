import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
// import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useState } from "react";
import axios from "axios"
export default function Home() {

  const [userStats, setUserStats] = useState([])
  useEffect(() => {
    const MONTHS = [
      "Jan",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const getStats = async () => {
      try {
        // Response Ex: [{"id": 5, "total": 3}]
        const response = await axios.get("https://api-netflix-app.herokuapp.com/stats", {
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            authtoken:
              "Bearer " + JSON.parse(localStorage.getItem("user")).myToken,
          },
        });
        const res = response.data.sort(function (a, b) {
          return a._id - b._id;
        });
        res.map((object) => {
          return setUserStats((prev) => [...prev, { name: MONTHS[object._id - 1], "Total Users": object.total }])
        })
      } catch (error) {
        console.error(error)
      }
    }
    getStats()
  }, [])
  console.log('User stats: ', userStats)
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="Total Users" />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
}
