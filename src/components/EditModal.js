import React, { useRef, useState } from "react";

const EditModal = ({ setEditModal, data, editEmployee, setData }) => {
  const [newName, setNewName] = useState(editEmployee[0]?.employee_name);
  const [newAge, setNewAge] = useState(editEmployee[0]?.employee_age);
  const [newSalary, setNewSalary] = useState(editEmployee[0]?.employee_salary);
  const formSubmit = (e) => {
    e?.preventDefault();

    // Find the index of the edited employee in the data array
    const indexOfEditedEmployee = data.findIndex(
      (emp) => emp.id === editEmployee[0]?.id
    );

    // Create a shallow copy of the data array
    const newData = [...data];

    // Update the employee in the copied array
    newData[indexOfEditedEmployee] = {
      employee_name: newName,
      employee_age: parseInt(newAge),
      employee_salary: newSalary,
      id: editEmployee[0]?.id,
      profile_image: "",
    };

    // Update the state with the new array
    setData(newData);

    // Close the modal
    setEditModal(false);
  };

  return (
    <div
      className="my_modal absolute inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={(e) => {
        if (e?.target?.className.includes("my_modal")) {
          setEditModal(false);
        }
      }}
    >
      <div className="w-[400px] h-[500px] bg-white border border-red-600">
        <p className="text-2xl text-center my-3">Edit Employee</p>
        <form
          className="flex flex-col px-3 py-5 gap-5 justify-center"
          onSubmit={formSubmit}
        >
          <input
            value={newName}
            placeholder="Name"
            required
            onChange={(e) => {
              setNewName(e?.target?.value);
            }}
            className="border border-black p-2"
            type="text"
          />
          <input
            value={newAge}
            placeholder="Age"
            onChange={(e) => {
              setNewAge(e?.target?.value);
            }}
            className="border border-black p-2"
            type="number"
          />
          <input
            value={newSalary}
            onChange={(e) => {
              setNewSalary(e?.target?.value);
            }}
            placeholder="Salary"
            className="border border-black p-2"
            type="number"
          />
          <button
            className="border border-black px-3 py-2 w-[200px]"
            onClick={formSubmit}
          >
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
