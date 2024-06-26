import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Read.css";

const Read = () => {
  const [data, setData] = useState();
  const [error, setError] = useState();

  async function getData() {
    try {
      const response = await fetch("http://localhost:5000");
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error);
      }
      setData(result);
      setError("");
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleDelete(id) {
    try {
      const response = await fetch(`http://localhost:5000/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error);
      }
      setError("Deleted Successfully");
      setTimeout(() => {
        setError("");
        getData();
      }, 2000);
    } catch (error) {
      setError(error.message);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="Readcontainer my-2">
      {error && <div className="alert alert-danger"> {error} </div>}
      <div className="row">
        {data &&
          data.map((ele) => (
            <div key={ele._id} className="col-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{ele.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{ele.email}</h6>
                  <p className="card-text">{ele.age}</p>
                  <Link to={`/${ele._id}`} className="card-link">
                    Edit
                  </Link>
                  <a
                    href="#"
                    className="card-link"
                    onClick={() => handleDelete(ele._id)}
                  >
                    Delete
                  </a>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Read;
