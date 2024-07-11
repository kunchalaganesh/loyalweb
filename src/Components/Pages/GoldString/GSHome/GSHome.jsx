import React, { useEffect } from "react";
import GSHeading from "../GSHeading/GSHeading";
import topBanner from "../../../Images/GSHome/topBanner.jpg";
import "../GSPagesStyles/GSHome.css";
import GSUpperAds from "./GSUpperAds";
import GSUpperIcons from "./GSUpperIcons";
import GSPerformanceChart from "./GSPerformanceChart";
import GSMiddleAds from "./GSMiddleAds";
import GSHomeMiddleVideos from "./GSHomeMiddleVideos";
import GSHomeLowerVideos from "./GSHomeLowerVideos";
import GSHomeQuickConnect from "./GSHomeQuickConnect";

export default function GSHome() {
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);
  // useEffect(() => {
  //   document.documentElement.scrollIntoView({ behavior: "smooth" });
  // }, []);
  return (
    <div className="GSHomeMainOuterBox">
      <GSHeading />
      <div className="gsHomeTopBannerBox">
        <img src={topBanner} />
        <div className="gsHomeTopBannerTextBox">
          <h1>Gold RFID</h1>
        </div>
      </div>
      <div className="gsHomeUpperAdOuterBox">
        <h3>Way Towards Brilliance !!</h3>
        <GSUpperAds />
        <GSUpperIcons />
      </div>
      <div className="gsHomePerformanceOuterBox">
        <GSPerformanceChart />
      </div>
      <h1>Gold RFID</h1>
      <div className="gsHomeMiddleAdOuterBox">
        <GSMiddleAds />
      </div>
      <div className="gsHomeMiddleVideosOuterBox">
        <GSHomeMiddleVideos />
      </div>
      <div className="gsHomeLowerVideosOuterBox">
        <GSHomeLowerVideos />
      </div>
      <div className="gsHomeQuickConnectOuterBox">
        <GSHomeQuickConnect />
      </div>
    </div>
  );
}
