import React from "react";

export default function AdminTopSelling() {
  const products = [
    { name: "Product 1", price: 10.99, quantity: 5 },
    { name: "Product 2", price: 19.99, quantity: 3 },
    { name: "Product 3", price: 7.49, quantity: 8 },
    { name: "Product 6", price: 10.99, quantity: 5 },
    { name: "Product 7", price: 19.99, quantity: 3 },
    { name: "Product 8", price: 7.49, quantity: 8 },
    // Add more product objects here
  ];

  return (
    <div className="adminTopSellingOuterBox">
      <div className="adminTopSellingInnerBox">
        <table>
          <thead>
            <tr>
              <th style={{ columnSpan: "2" }}>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.name}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>{product.quantity}</td>
                <td>${(product.price * product.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
