import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
export default function AdminDashboardCategories() {
  const percentage1 = 55;
  const percentage2 = 80;
  const percentage3 = 77;
  const percentage4 = 35;
  return (
    <div className="adminDashboardCategoriesOutermostBox">
      <div className="adminDashboardCategoriesOuterBox">
        <div className="adminDashboardCategoriesInnerBox">
          <div className="adminDashboardCategoriesInnerChartBox">
            <CircularProgressbar
              styles={buildStyles({
                textSize: "16px",
                textColor: "rgba(26, 188, 156, 0.85",
                pathColor: `rgba(26, 188, 156, 0.85`,
              })}
              value={percentage1}
              text={`${percentage1}%`}
            />
          </div>
          <div className="adminDashboardCategoriesInnerDataBox">
            <h2>268</h2>
            <p>New Customers</p>
          </div>
        </div>
        <div className="adminDashboardCategoriesInnerBox">
          <div className="adminDashboardCategoriesInnerChartBox">
            <CircularProgressbar
              styles={buildStyles({
                textSize: "16px",
                textColor: "#02a8b5",
                pathColor: `#02a8b5`,
              })}
              value={percentage2}
              text={`${percentage2}%`}
            />
          </div>
          <div className="adminDashboardCategoriesInnerDataBox">
            <h2>8574</h2>
            <p>Online Orders</p>
          </div>
        </div>
        <div className="adminDashboardCategoriesInnerBox">
          <div className="adminDashboardCategoriesInnerChartBox">
            <CircularProgressbar
              styles={buildStyles({
                textSize: "16px",
                textColor: "#f672a7",
                pathColor: `#f672a7`,
              })}
              value={percentage3}
              text={`${percentage3}%`}
            />
          </div>
          <div className="adminDashboardCategoriesInnerDataBox">
            <h2>₹300000</h2>
            <p>Revenue</p>
          </div>
        </div>
        <div className="adminDashboardCategoriesInnerBox">
          <div className="adminDashboardCategoriesInnerChartBox">
            <CircularProgressbar
              styles={buildStyles({
                textSize: "16px",
                textColor: "#6c757d",
                pathColor: `#6c757d`,
              })}
              value={percentage4}
              text={`${percentage4}%`}
            />
          </div>
          <div className="adminDashboardCategoriesInnerDataBox">
            <h2>₹10000</h2>
            <p>Daily Average</p>
          </div>
        </div>
      </div>
    </div>
  );
}
