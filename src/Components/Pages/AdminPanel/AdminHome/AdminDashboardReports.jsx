import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import AdminBarChart from "./AdminBarChart";
import AdminAreaChart from "./AdminAreaChart";
import AdminRadarChart from "./AdminRadarChart";

export default function Hello() {
  return (
    <div className="adminDashboardCategoriesOutermostBox">
      {/* Barchart  Below */}
      <div
        style={{ padding: "0" }}
        className="adminDashboardCategoriesOuterBox"
      >
        <div className="adminDashboardCategoriesInnerBox adminDashboardCategoriesReportsBox">
          <div className="adminDashboardCategoriesReportsInnerBox">
            <p>Revenue Report</p>
            <BsThreeDots style={{ cursor: "pointer" }} />
          </div>
          <div className="adminDashboardCategoriesReportsGridMainBox">
            <div className="adminDashboardCategoriesReportsGridItems">
              <p>Target</p>
              <h3>$12,365</h3>
            </div>
            <div className="adminDashboardCategoriesReportsGridItems">
              <p>Last Week</p>
              <div className="adminDashboardCategoriesReportsGridItemsPriceBox">
                <AiOutlineArrowDown size={"20px"} color="red" />
                <h3>$365</h3>
              </div>
            </div>
            <div className="adminDashboardCategoriesReportsGridItems">
              <p>Last Month</p>
              <div className="adminDashboardCategoriesReportsGridItemsPriceBox">
                <AiOutlineArrowUp size={"20px"} color="#3b82da" />
                <h3>$8501</h3>
              </div>
            </div>
          </div>
          <div className="adminDashboardCategoriesReportsBarChartMainBox">
            <AdminBarChart />
          </div>
        </div>
        {/* Area Chart  Below */}
        <div className="adminDashboardCategoriesInnerBox adminDashboardCategoriesReportsBox">
          <div className="adminDashboardCategoriesReportsInnerBox">
            <p>Product Sales</p>
            <BsThreeDots style={{ cursor: "pointer" }} />
          </div>
          <div className="adminDashboardCategoriesReportsGridMainBox">
            <div className="adminDashboardCategoriesReportsGridItems">
              <p>Target</p>
              <h3>$12,365</h3>
            </div>
            <div className="adminDashboardCategoriesReportsGridItems">
              <p>Last Week</p>
              <div className="adminDashboardCategoriesReportsGridItemsPriceBox">
                <AiOutlineArrowDown size={"20px"} color="red" />
                <h3>$365</h3>
              </div>
            </div>
            <div className="adminDashboardCategoriesReportsGridItems">
              <p>Last Month</p>
              <div className="adminDashboardCategoriesReportsGridItemsPriceBox">
                <AiOutlineArrowUp size={"20px"} color="#3b82da" />
                <h3>$8501</h3>
              </div>
            </div>
          </div>
          <div className="adminDashboardCategoriesReportsBarChartMainBox">
            <AdminAreaChart />
          </div>
        </div>
        {/* Radar Chart  Below */}
        <div className="adminDashboardCategoriesInnerBox adminDashboardCategoriesReportsBox">
          <div className="adminDashboardCategoriesReportsInnerBox">
            <p>Marketing Report</p>
            <BsThreeDots style={{ cursor: "pointer" }} />
          </div>
          <div className="adminDashboardCategoriesReportsGridMainBox">
            <div className="adminDashboardCategoriesReportsGridItems">
              <p>Target</p>
              <h3>$12,365</h3>
            </div>
            <div className="adminDashboardCategoriesReportsGridItems">
              <p>Last Week</p>
              <div className="adminDashboardCategoriesReportsGridItemsPriceBox">
                <AiOutlineArrowDown size={"20px"} color="red" />
                <h3>$365</h3>
              </div>
            </div>
            <div className="adminDashboardCategoriesReportsGridItems">
              <p>Last Month</p>
              <div className="adminDashboardCategoriesReportsGridItemsPriceBox">
                <AiOutlineArrowUp size={"20px"} color="#3b82da" />
                <h3>$8501</h3>
              </div>
            </div>
          </div>
          <div className="adminDashboardCategoriesReportsBarChartMainBox">
            <AdminRadarChart />
          </div>
        </div>
      </div>
    </div>
  );
}
