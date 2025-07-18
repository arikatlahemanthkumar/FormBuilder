import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./FormList.css";

export default function FormList() {
  const [forms, setForms] = useState([]);
  useEffect(() => {
    const fetchForms = async () => {
      try {
        const res = await axios.get("http://localhost:3050/api/");
        setForms(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchForms();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this form?")) {
      try {
        await axios.delete(`http://localhost:3050/api/form/${id}`);
        setForms(forms.filter(f => f._id !== id));
      } catch (err) {
        alert("Failed to delete form.");
      }
    }
  };

  return (
    <div>
      <div className="formlist-header">
        <h1 className="formlist-title">Welcome to Form Builder.com</h1>
        <div className="formlist-subtitle">This is a simple form builder.</div>
        <Link to="/form/create">
          <button className="formlist-create-btn">CREATE NEW FORM</button>
        </Link>
      </div>
      <hr className="formlist-divider" />
      <div className="formlist-container">
        <h2 className="formlist-section-title">Forms</h2>
        {forms.length === 0 ? (
          <div className="formlist-empty">You have no forms created yet.</div>
        ) : (
          <ul className="formlist-list">
            {forms.map((form) => (
              <li className="formlist-card" key={form._id}>
                <div className="formlist-card-title">{form.title}</div>
                <div className="formlist-actions">
                  <Link to={`/form/${form._id}`}>
                    <button className="formlist-view-btn">
                      <span style={{ marginRight: "6px" }}>VIEW</span> 
                    </button>
                  </Link>
                  <Link to={`/form/${form._id}/edit`} className="formlist-edit">
                    EDIT
                  </Link>
                  <span
                    className="formlist-delete"
                    onClick={() => handleDelete(form._id)}
                  >
                    DELETE
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}