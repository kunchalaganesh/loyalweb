import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import AdminTopSelling from "./AdminTopSelling";
export default function AdminLocation() {
  const branchLocations = [
    { name: "Branch 1, Revenue - $10000 ", location: [18.68022, 73.83917] }, // Example coordinates for London
    { name: "Branch 2, Revenue - $20000 ", location: [19.182755, 72.840157] }, // Example coordinates for New York
    // Add more branch locations here
  ];
  const markerIcon = new L.icon({
    iconUrl: require("../../../Images/locationIcon.png"),
    iconSize: [35, 25],
    // iconAnchor: [17, 46],
    // popupAnchor: [3, -46],
  });
  return (
    <div className="adminLocationOuterBox">
      <div className="adminLocationInnerBox">
        <p>Revenue By Location</p>
        <MapContainer center={[20, 77]} zoom={2} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* <Marker position={[18.68022, 73.83917]} icon={markerIcon}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker> */}
          {branchLocations.map((branch, index) => (
            <Marker
              key={index}
              position={branch.location}
              icon={markerIcon} // Use the custom icon if needed
            >
              <Popup>{branch.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <div className="adminLocationInnerBox">
        <p>Top Selling Products</p>
        <AdminTopSelling />
      </div>
    </div>
  );
}
