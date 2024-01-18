import { useEffect, useState } from "react";
import "./App.css";
import EditModal from "./components/EditModal";
import AddModal from "./components/AddModal";

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editEmployee, setEditEmployee] = useState([]);

  const getData = async () => {
    const data = await fetch(
      "https://dummy.restapiexample.com/api/v1/employees"
    );
    const res = await data?.json();
    // console.log(res);
    setData(res?.data);
  };
  useEffect(() => {
    console.log("FETCHED DATA");
    getData();
    // console.log(data);
  }, []);

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= Math.ceil(data.length / 5) &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  const deleteEmployee = (currId) => {
    const selectedEmployee = data?.filter((emp) => emp?.id === currId);
    const newData = data.filter(
      (newEmps) => newEmps.id !== selectedEmployee[0].id
    );
    setData(newData);
  };

  return (
    <>
      <div className="flex justify-center align-middle">
        <div className="flex justify-between w-[1000px] text-3xl py-5">
          <div>Employees</div>
          <div>
            <button
              onClick={() => setAddModal(true)}
              className="text-base border rounded-lg px-3 py-2 bg-green-400"
            >
              Add Employee
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center align-middle">
        <div className="border border-black mx-10 w-[1000px] rouned-lg">
          <div className="border-b-2 grid grid-cols-4 p-5 text-xl font-bold">
            <div className=" flex">
              <div className="">Name</div>
              <div className="flex">
                <button
                  className="rotate-180"
                  onClick={() => {
                    const newData = [...data].sort((a, b) =>
                      a.employee_name.localeCompare(b.employee_name)
                    );
                    setData(newData);
                  }}
                >
                  🔽
                </button>
                <button
                  className=""
                  onClick={() => {
                    const newData = [...data].sort((a, b) =>
                      b.employee_name.localeCompare(a.employee_name)
                    );
                    setData(newData);
                  }}
                >
                  🔽
                </button>
              </div>
            </div>
            <div className="w-full text-center">Age</div>
            <div className="w-full text-center">Salary</div>
            <div className="w-full text-center">Actions</div>
          </div>
          {data?.slice(page * 5 - 5, page * 5).map((emp) => (
            <div key={emp?.id}>
              <div className="grid grid-cols-4 p-5">
                <span className="w-full">{emp?.employee_name}</span>
                <span className="w-full text-center">{emp?.employee_age}</span>
                <span className="w-full text-center">
                  {emp?.employee_salary}
                </span>
                <div className="text-center">
                  <span
                    className="cursor-pointer mr-3"
                    onClick={() => deleteEmployee(emp?.id)}
                  >
                    ❌
                  </span>
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      const currEmp = data?.filter(
                        (curr) => curr.id === emp.id
                      );
                      setEditEmployee(currEmp);
                      // console.log(currEmp);
                      setEditModal(true);
                    }}
                  >
                    ✏️
                  </span>
                </div>
              </div>
            </div>
          ))}
          {data.length > 0 && (
            <div className="flex justify-center text-xl my-5">
              <span
                className="cursor-pointer"
                onClick={() => selectPageHandler(page - 1)}
              >
                ⬅️
              </span>
              {Array.from({ length: Math.ceil(data.length / 5) }, (_, i) => (
                <span
                  className={` ${
                    page === i + 1 ? "bg-slate-400" : "bg-white"
                  } px-2 cursor-pointer`}
                  key={i + 1}
                  onClick={() => selectPageHandler(i + 1)}
                >
                  {i + 1}
                </span>
              ))}
              <span
                className="cursor-pointer"
                onClick={() => selectPageHandler(page + 1)}
              >
                ➡️
              </span>
            </div>
          )}
          {addModal && <AddModal setAddModal={setAddModal} data={data} />}
          {editModal && (
            <EditModal
              setEditModal={setEditModal}
              data={data}
              editEmployee={editEmployee}
              setData={setData}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
