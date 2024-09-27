import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LoadCanvasTemplate,
  loadCaptchaEnginge,
  validateCaptcha,
} from "react-simple-captcha";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [captchaText, setCaptchaText] = useState("");
  const [disableLoginBtn, setDisableLoginBtn] = useState(true);
  const { login, resetPassword, googleSignIn } = useAuth();
  const [loginError, setLoginError] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const axiosPublic = useAxiosPublic();

  const onSubmit = (data) => {
    login(data.email, data.password)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You've signed up successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch((err) => setLoginError(err.message));
  };
  const handleCaptcha = (e) => {
    e.preventDefault();
    if (validateCaptcha(captchaText)) {
      setDisableLoginBtn(false);
    } else {
      setDisableLoginBtn(true);
    }
  };
  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);
  const handlePasswordReset = () => {
    resetPassword(email)
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Password reset email sent",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => setLoginError(err.message));
  };
  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        const userInfo = {
          name: result.user.displayName,
          email: result.user.email,
          image: result?.user?.photoURL,
          uid: result?.user?.uid,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          if (res.data.insertedId) {
            //   reset();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "You've logged in successfully.",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          navigate(from, { replace: true });
        });
      })
      .catch((err) => setLoginError(err.message));
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row">
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Every pet deserves a loving home, and by signing up, you are taking
            the first step toward making that possible. Whether you are looking
            to adopt, donate, or help spread the word, your compassion can
            change a life forever.
          </p>
        </div>
        <div className="lg:w-1/2 card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                {...register("email", { required: true })}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-400">Email is required</p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                {...register("password")}
                className="input input-bordered"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-400">Password is required</p>
              )}
              <label className="label">
                <button
                  onClick={handlePasswordReset}
                  className="label-text-alt link link-hover"
                >
                  Forgot password?
                </button>
              </label>
            </div>
            <div className="form-control">
              <LoadCanvasTemplate />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Captcha</span>
              </label>
              <input
                onBlur={handleCaptcha}
                onChange={(e) => setCaptchaText(e.target.value)}
                type="text"
                placeholder="Type captcha"
                name="captcha"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button disabled={disableLoginBtn} className="btn btn-primary">
                Login
              </button>
            </div>
          </form>
          <div className="form-control mt-6">
            <button
              onClick={handleGoogleLogin}
              className="w-10/12 mx-auto btn btn-primary"
            >
              Login with Google
            </button>
          </div>
          <p className="text-center my-3">
            New to Paw pals rescue?{" "}
            <Link className="text-orange-400" to="/signup">
              Signup
            </Link>
          </p>
          {loginError && (
            <p className="text-red-600 text-center mb-3">{loginError}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
