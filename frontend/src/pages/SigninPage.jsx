import { useState } from "react";
import api from "../lib/axios.js";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";

const SigninPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user_email: "",
    user_password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await api.post("/users/signin", formData);

      toast.success("Giriş başarılı! Yönlendiriliyorsunuz...");

      localStorage.setItem("user", JSON.stringify(response.data));

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Giriş yapılamadı. Lütfen bilgilerinizi kontrol edin.";

      console.error("Giriş hatası:", errorMessage);

      toast.error(errorMessage);

      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Giriş Yap
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />

            <input
              type="email"
              name="user_email"
              placeholder="E-posta"
              value={formData.user_email}
              onChange={handleChange}
              required
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />

            <input
              type={showPassword ? "text" : "password"}
              name="user_password"
              placeholder="Şifre"
              value={formData.user_password}
              onChange={handleChange}
              required
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-700 transition-transform transform hover:scale-102 shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Hesabın yok mu?{" "}
          <Link
            to="/signup"
            className="font-medium text-red-600 hover:underline"
          >
            Kayıt Ol
          </Link>
        </p>

        <div className="flex items-center justify-center">
          <Link to="/" className="flex">
            <ArrowLeft
              className="text-red-600 font-bold cursor-pointer"
              size={20}
            />

            <span className="text-gray-800 hover:underline ms-1 text-sm">
              Ana Sayfa
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
