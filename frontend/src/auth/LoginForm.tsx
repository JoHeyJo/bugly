import React, { useState } from "react";
import AlertPopUp from "../AlertPopUp";
// import "./LoginForm.css";
import { useNavigate } from "react-router-dom";
import "../style/LoginForm.css";

/** Login form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls login function prop
 *
 * Routes -> LoginForm -> Alert
 * Routed as /login
 */

function LoginForm({ login }:any) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState<string[]>([]);

  console.debug(
    "LoginForm",
    "login=", typeof login,
    "formData=", formData,
    "formErrors", formErrors,
  );

  /** Handle form submit:
   *
   * Calls login func prop and, if not successful, sets errors.
   */
  async function handleSubmit(evt: any) {
    evt.preventDefault();
    try {
      const res = await login(formData);
      navigate("/")
    } catch (err: any) {
      console.error('error in LoginForm',err)
      setFormErrors([err.response.data.error]);
    }
  }

  /** Update form data field */
  function handleChange(evt: any) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  return (
    <div id="LoginForm" style={{height: "75vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h3 className="mb-3">Log In</h3>

        <div className="card" style={{ border: "none", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}>
          <div className="card-body-loginForm" style={{ padding: "2rem" }}>

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  name="email"
                  className="form-control"
                  style={{ border: "1px solid #ccc", padding: "0.375rem 0.75rem" }}
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  style={{ border: "1px solid #ccc", padding: "0.375rem 0.75rem" }}
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                />
              </div>

              {formErrors.length
                ? <AlertPopUp variant={"danger"} message={formErrors} />
                : null}

              <div className="d-grid">
                <button className="btn btn-primary" style={{ backgroundColor: "#007bff" }}>Submit</button>
              </div>

            </form>

          </div>
        </div>

      </div>
    </div>

  );
}

export default LoginForm;
