import React, { useRef } from "react";

const AddModal = ({ setAddModal, data }) => {
  let newName = useRef("");
  let newAge = useRef();
  let newSalary = useRef();

  const formSubmit = (e) => {
    e?.preventDefault();

    let newEmployee = {
      employee_name: newName.current,
      employee_age: newAge.current,
      employee_salary: newSalary.current,
      id: data.length + 1,
      profile_image: "",
    };

    // Update data state with the new employee
    data.unshift(newEmployee);

    // Update session storage with the modified data
    sessionStorage.setItem("employeeData", JSON.stringify(data));

    // Close the modal
    setAddModal(false);
  };

  return (
    <div
      className="my_modal absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={(e) => {
        if (e?.target?.className.includes("my_modal")) {
          setAddModal(false);
        }
      }}
    >
      <div className="w-[400px] h-[500px] bg-white border border-red-600">
        <p className="text-2xl text-center my-3">Add Employee</p>
        <form
          className="flex flex-col px-3 py-5 gap-5 justify-center"
          onSubmit={formSubmit}
        >
          <input
            placeholder="Name"
            required
            ref={newName}
            onChange={(e) => {
              newName.current = e.target.value;
            }}
            className="border border-black p-2"
            type="text"
          />
          <input
            placeholder="Age"
            ref={newAge}
            onChange={(e) => {
              newAge.current = e.target.value;
            }}
            className="border border-black p-2"
            type="number"
          />
          <input
            placeholder="Salary"
            ref={newSalary}
            onChange={(e) => {
              newSalary.current = e.target.value;
            }}
            className="border border-black p-2"
            type="number"
          />
          <button
            className="border border-black px-3 py-2 w-[200px] bg-green-400"
            onClick={formSubmit}
          >
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
