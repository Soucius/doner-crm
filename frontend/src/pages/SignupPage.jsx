import { useState, useEffect } from "react";
import api from "../lib/axios.js";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  User,
  Mail,
  Phone,
  Lock,
  ArrowLeft,
  Building,
  EyeOff,
  Eye,
} from "lucide-react";

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_phone: "",
    user_password: "",
    branch_id: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [branches, setBranches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const branchesResponse = await api.get("/branches");

        setBranches(branchesResponse.data);
      } catch (error) {
        console.error("Şubeler çekilirken hata oluştu:", error);

        setError(
          "Gerekli veriler yüklenirken bir hata oluştu. Lütfen tekrar deneyin."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchBranches();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.user_name ||
      !formData.user_email ||
      !formData.user_phone ||
      !formData.user_password ||
      !formData.branch_id
    ) {
      setError("Lütfen tüm alanları doldurun.");

      return;
    }

    try {
      const users = await api.post("/users", formData);

      toast.success("Kayıt başarıyla tamamlandı! Giriş yapılıyor...");

      localStorage.setItem("token", users.data.token);
      localStorage.setItem("user", JSON.stringify(users.data.user));

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err) {
      console.error("Signup error:", err.users?.data?.message || err.message);

      setError(
        err.users?.data?.message || "Bir hata oluştu. Lütfen tekrar deneyin."
      );

      toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Hesap Oluştur
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />

            <input
              type="text"
              name="user_name"
              placeholder="Ad Soyad"
              value={formData.user_name}
              onChange={handleChange}
              required
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
            />
          </div>
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
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />

            <input
              type="tel"
              name="user_phone"
              placeholder="Telefon"
              value={formData.user_phone}
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
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <div className="relative">
            <Building className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />

            <select
              name="branch_id"
              value={formData.branch_id}
              onChange={handleChange}
              required
              disabled={isLoading}
              className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none appearance-none bg-white"
            >
              <option value="" disabled>
                Bir Şube Seçin
              </option>

              {branches.map((branch) => (
                <option key={branch._id} value={branch._id}>
                  {branch.branch_name}
                </option>
              ))}
            </select>
          </div>

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-red-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-700 transition-transform transform hover:scale-102 shadow-lg"
          >
            {isLoading ? "Yükleniyor..." : "Hesap Oluştur"}
          </button>

          <div className="flex items-center justify-center">
            <Link to="/signin">
              <span className="text-gray-800">Hesabın var mı?</span>

              <span className="text-red-600 font-bold cursor-pointer hover:underline ms-1">
                Giriş Yap
              </span>
            </Link>
          </div>

          <div className="flex items-center justify-center">
            <Link to="/" className="flex">
              <ArrowLeft className="text-red-600 font-bold cursor-pointer" />

              <span className="text-gray-800 hover:underline ms-1">
                Ana Sayfa
              </span>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
