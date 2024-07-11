import React from "react";
import image1 from "../../../Images/GSHome/handheldRfidGun.jpg";
import image2 from "../../../Images/GSHome/rfidUhfTag.jpg";
import image3 from "../../../Images/GSHome/gateRfidUhf.jpg";
import image4 from "../../../Images/GSHome/rfidBillBox.jpg";

export default function GSMiddleAds() {
  return (
    <div className="gsMiddleAdsMainBox">
      <div className="gsMiddleAdsItemsBox">
        <img src={image1} alt="Image 1" />
        <div className="gsMiddleAdsItemsDetailsBox">
          <h3>Handheld RFID UHF</h3>
          <p>100% Accurate Inventory</p>
          <p>Dead Stock Identification</p>
          <p>Quick Estimate / Billing</p>
          <p>Search Exact Products</p>
        </div>
      </div>
      <div className="gsMiddleAdsItemsBox">
        <img src={image2} alt="Image 2" />
        <div className="gsMiddleAdsItemsDetailsBox">
          <h3>RFID UHF Tag</h3>
          <p>Easy Integration with QR</p>
          <p>Reusable 10000 Times</p>
          <p>Programmed with cloud</p>
          <p>AM+UHF for High Security</p>
        </div>
      </div>
      <div className="gsMiddleAdsItemsBox">
        <img src={image3} alt="Image 3" />

        <div className="gsMiddleAdsItemsDetailsBox">
          <h3>Gate RFID UHF</h3>
          <p>Counter Theft detection</p>
          <p>Instant Alarm</p>
          <p>Identify Billed Items</p>
          <p>Customised Design</p>
        </div>
      </div>
      <div className="gsMiddleAdsItemsBox">
        <img src={image4} alt="Image 4" />

        <div className="gsMiddleAdsItemsDetailsBox">
          <h3>RFID Bill Box</h3>
          <p>Quick Bill Generation</p>
          <p>Connect with Tab/Phone</p>
          <p>Generate quick estimate</p>
          <p>Product Safe Analysis</p>
        </div>
      </div>
    </div>
  );
}
