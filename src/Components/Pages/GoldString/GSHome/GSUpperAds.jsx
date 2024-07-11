import React, { useState } from "react";
import image1 from "../../../Images/GSHome/codingImage.jpg";
import image2 from "../../../Images/GSHome/rfidGun.jpg";
import image3 from "../../../Images/GSHome/ribbonImage.jpg";

export default function GSUpperAds() {
  const images = [
    {
      id: 1,
      src: image1,
      p1: "We design, build and ",
      p2: "support powerful",
      p3: "RFID solution for",
      p4: "Jewellery Business.",
    },
    {
      id: 2,
      src: image2,
      p1: "Get started with our",
      p2: "Handheld RFID",
      p3: "Reader to Hassle free",
      p4: "Inventory Verification.",
    },
    {
      id: 3,
      src: image3,
      p1: "With tons of features",
      p2: "at your fingertips, let",
      p3: "enjoy the technology",
      p4: "in new way",
    },
  ];
  const [hoveredIndex, setHoveredIndex] = useState(2);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
    // alert(index);
  };
  return (
    <div className="gsHomeUpperAdMainBox">
      {images.map((image, index) => {
        return (
          <div className="gsHomeUpperAdItemsBox">
            <img
              className={
                hoveredIndex == index + 1 ? "gsHomeUpperAdItemsImage" : null
              }
              src={image.src}
              onMouseEnter={() => handleMouseEnter(index + 1)}
            />
            {hoveredIndex == index + 1 ? (
              <div className="gsHomeUpperAdItemsTextBox">
                <p>{images[index].p1}</p>
                <p>{images[index].p2}</p>
                <p>{images[index].p3}</p>
                <p>{images[index].p4}</p>
              </div>
            ) : null}
          </div>
        );
      })}

      {/* <div className="gsHomeUpperAdItemsBox gsHomeUpperAdItemsBox2">
        <img src={image2} onMouseEnter={() => handleMouseEnter(2)} />
      </div>
      <div className="gsHomeUpperAdItemsBox gsHomeUpperAdItemsBox3">
        <img src={image3} onMouseEnter={() => handleMouseEnter(3)} />
      </div> */}
    </div>
  );
}
