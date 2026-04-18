import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginAdminMutation } from "../page/redux/api/userApi";
import { message, Spin } from "antd";
import { useDispatch } from "react-redux";
import { setToken } from "../page/redux/features/auth/authSlice";

const Login = () => {
  const [login, { isLoading }] = useLoginAdminMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  // ✅ Load saved data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("loginData");

    if (savedData) {
      const parsed = JSON.parse(savedData);
      setFormValues({
        email: parsed.email || "",
        password: parsed.password || "",
        remember: true,
      });
    }
  }, []);

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login({
        email: formValues.email,
        password: formValues.password,
      }).unwrap();

      const role = res?.data?.role;

      // ✅ Role check
      if (role === "venueOwner") {
        dispatch(setToken(res?.data?.accessToken));

        console.log("Login Success:", res);
        navigate("/");
        message.success(res?.message);

        // remember me
        if (formValues.remember) {
          localStorage.setItem(
            "loginData",
            JSON.stringify({
              email: formValues.email,
              password: formValues.password,
            }),
          );
        } else {
          localStorage.removeItem("loginData");
        }
      } else {
        message.error("You are not authorized to login!");
      }
    } catch (err) {
      message.error(err?.data?.message || "Login failed");
      console.error("Login Error:", err);
    }
  };

  return (
    <div className="flex font-nunito justify-center items-center min-h-screen px-4 lg:px-0 bg-[#0F0B1A]">
      <div className="w-full max-w-lg lg:p-8 p-4 border border-[#2A2448] rounded-lg bg-[#822CE71A]">
        <h2 className="text-2xl font-semibold text-white mb-2 italic">
          Welcome Back
        </h2>

        <p className="text-gray-400 mb-6 text-sm">
          Sign in to continue exploring and managing your Venue.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-gray-400 block mb-1">
              Enter Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-[#1D1733] border border-[#2A2448] text-white rounded-lg"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-400 block mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formValues.password}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-[#1D1733] border border-[#2A2448] text-white rounded-lg"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Remember */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-gray-400">
              <input
                type="checkbox"
                name="remember"
                checked={formValues.remember}
                onChange={handleChange}
              />
              Remember me
            </label>

            <Link to={"/forgot-password"} className="text-sm text-[#9D5BFF]">
              Forget password?
            </Link>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded text-white flex justify-center items-center gap-2 ${
              isLoading ? "bg-[#b879ff]" : "bg-[#822CE7] hover:bg-[#4a0e8f]"
            }`}
          >
            {isLoading ? (
              <>
                <Spin size="small" />
                <span>Logging in...</span>
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <span className="flex justify-center pt-2 text-white">
          No account yet?{" "}
          <Link to={"/joinAs"}>
            <span className="text-[#822CE7]"> Create an account</span>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
