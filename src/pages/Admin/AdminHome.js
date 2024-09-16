import React from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";

const AdminHome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Layout>
      <div className="container">
        <div className="d-felx flex-column mt-4">
          <h1>
            Welcome Admin <i className="text-success"> {user?.name}</i>
          </h1>
          <h3>Manage BloodConnect App </h3>
          <hr />
          <p>
            BloodConnect is a comprehensive blood bank management website built
            using the MERN (MongoDB, Express, React, Node.js) stack. It is
            designed to streamline the management of blood inventories, donor
            information, and blood donation events. The application leverages
            Redux for efficient state management and ensures scalable data flow
            across components. Additionally, JWT (JSON Web Tokens) is
            implemented for secure user authentication, providing role-based
            access for donors, organizations, and administrators. BloodConnect
            aims to enhance the efficiency and reliability of blood banks
            through a user-friendly, secure, and scalable platform.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminHome;
