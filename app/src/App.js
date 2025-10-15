/**
 * @description      :
 * @author           : DHANUSH
 * @group            :
 * @created          : 15/10/2025 - 18:42:43
 *
 * MODIFICATION LOG
 * - Version         : 1.0.0
 * - Date            : 15/10/2025
 * - Author          : DHANUSH
 * - Modification    :
 **/
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [error, setError] = useState(null);
  const recordsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url =
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
        const response = await fetch(url);

        if (!response.ok) {
        }

        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Fetch error:", error);
        alert("failed to fetch data");
        setError(error.message);
      }
    };
    fetchData();
  }, []);

  const totalPages = Math.ceil(employees.length / recordsPerPage);
  const startIndex = (currentPage - 1) * recordsPerPage;
  const currentRecords = employees.slice(
    startIndex,
    startIndex + recordsPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  if (error) {
    return (
      <p style={{ textAlign: "center", color: "red" }}>Failed to load data.</p>
    );
  }

  return (
    <div className="App">
      <div className="header">X-Pagination</div>
      <div className="tableData">
        <h1>Employee Data</h1>

        <table className="tableContent">
          <thead style={{ backgroundColor: "#f2f2f2" }}>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>

          <tbody>
            {currentRecords.length > 0 ? (
              currentRecords.map((emp) => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.role}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">Loading...</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="handlingPagination">
          <button
            className="previousButton"
            onClick={handlePrevious}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span>
            Page <span>{Number(currentPage)}</span> of{" "}
            <span> {Number(totalPages)} </span>
          </span>

          <button
            className="nextButton"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
