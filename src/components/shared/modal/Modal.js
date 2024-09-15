import React, { useState } from "react";
import { useSelector } from "react-redux";
import InputType from "./../Form/InputType";
import API from "./../../../services/API";

const Modal = () => {
  const [inventoryType, setInventoryType] = useState("in");
  const [bloodGroup, setBloodGroup] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [email, setEmail] = useState("");
  const { user } = useSelector((state) => state.auth);

  // Handle quantity input change
  const handleQuantityChange = (e) => {
    const value = e.target.value;
    // Allow only non-negative integers or empty string
    if (value === '' || /^[0-9]*$/.test(value)) {
      setQuantity(value);
    }
  };

  const handleModalSubmit = async () => {
    try {
      if (!bloodGroup || quantity <= 0) {
        return alert("Please provide all required fields with a valid quantity.");
      }
      const { data } = await API.post("/inventory/create-inventory", {
        email,
        organisation: user?._id,
        inventoryType,
        bloodGroup,
        quantity,
      });
      if (data?.success) {
        alert("New blood record created successfully.");
        window.location.reload();
      }
    } catch (error) {
      alert(`Error: ${error.response.data.message}`);
      console.log(error);
      window.location.reload();
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Manage Blood Record
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <span className="me-2">Inventory Type:</span>
                <div className="d-inline-flex">
                  <div className="form-check me-3">
                    <input
                      type="radio"
                      name="inventoryType"
                      defaultChecked
                      value="in"
                      onChange={(e) => setInventoryType(e.target.value)}
                      className="form-check-input"
                      id="inRadio"
                    />
                    <label className="form-check-label" htmlFor="inRadio">
                      IN (Donating)
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      name="inventoryType"
                      value="out"
                      onChange={(e) => setInventoryType(e.target.value)}
                      className="form-check-input"
                      id="outRadio"
                    />
                    <label className="form-check-label" htmlFor="outRadio">
                      OUT (Receiving)
                    </label>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <span className="me-2">Blood Type:</span>
                <select
                  className="form-select"
                  aria-label="Select Blood Group"
                  onChange={(e) => setBloodGroup(e.target.value)}
                  defaultValue=""
                >
                  <option value="" disabled>Select Blood Group</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                </select>
              </div>
              <InputType
                labelText={inventoryType === "out" ? "Receiver's Email" : "Donor's Email"}
                labelFor="email"
                inputType="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputType
                labelText="Quantity (ML)"
                labelFor="quantity"
                inputType="number"
                min="0" // Ensure no negative values
                value={quantity}
                onChange={handleQuantityChange}
              />
              <div className="mt-3">
                <strong>Selected Blood Type:</strong> {bloodGroup || "None"}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleModalSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;



