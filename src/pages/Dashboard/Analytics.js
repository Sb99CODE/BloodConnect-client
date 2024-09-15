import React, { useState, useEffect } from "react";
import Header from "../../components/shared/Layout/Header";
import API from "./../../services/API";
import moment from "moment";

const Analytics = () => {
  const [data, setData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const colors = [
    "#FFB74D",  // Light Orange
    "#64B5F6",  // Light Blue
    "#4DB6AC",  // Teal
    "#81C784",  // Light Green
    "#FFD54F",  // Light Yellow
    "#E57373",  // Light Red
    "#BA68C8",  // Light Purple
    "#90A4AE",  // Light Grayish Blue
];


  const getBloodGroupData = async () => {
    try {
      const { data } = await API.get("/analytics/bloodGroups-data");
      if (data?.success) {
        setData(data?.bloodGroupData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodGroupData();
  }, []);

  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-recent-inventory");
      if (data?.success) {
        setInventoryData(data?.inventory);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodRecords();
  }, []);

  return (
    <>
      <Header />
      <div className="container my-3">
        <h1 className="my-3">Blood Group Data</h1>
        <div className="row">
          {data?.map((record, i) => (
            <div
              className="col-md-6 col-lg-3 mb-4"
              key={i}
            >
              <div
                className="card p-3"
                style={{ backgroundColor: `${colors[i]}`, minHeight: "200px" }}
              >
                <div className="card-body">
                  <h5 className="card-title bg-light text-dark text-center mb-3">
                    {record.bloodGroup}
                  </h5>
                  <p className="card-text">
                    Total In : <b>{record.totalIn}</b> (ML)
                  </p>
                  <p className="card-text">
                    Total Out : <b>{record.totalOut}</b> (ML)
                  </p>
                </div>
                <div className="card-footer text-light bg-dark text-center">
                  Total Available : <b>{record.availabeBlood}</b> (ML)
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container my-3">
        <h1 className="my-3">Recent Blood Transactions</h1>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Blood Group</th>
                <th scope="col">Inventory Type</th>
                <th scope="col">Quantity</th>
                <th scope="col">Donor Email</th>
                <th scope="col">Time & Date</th>
              </tr>
            </thead>
            <tbody>
              {inventoryData?.map((record) => (
                <tr key={record._id}>
                  <td>{record.bloodGroup}</td>
                  <td>{record.inventoryType}</td>
                  <td>{record.quantity} (ML)</td>
                  <td>{record.email}</td>
                  <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Analytics;



