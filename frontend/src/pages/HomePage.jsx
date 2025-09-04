import api from "../lib/axios.js";
import {
  Headset,
  LifeBuoy,
  Mail,
  MessageSquare,
  ShieldCheck,
  User,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { useState } from "react";

const HomePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    successMessage: "",
    errorMessage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormStatus({ isSubmitting: true, successMessage: "", errorMessage: "" });

    try {
      const response = await api.post("/contact", formData);

      setFormStatus({
        isSubmitting: false,
        successMessage: response.data.message,
        errorMessage: "",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setFormStatus({
        isSubmitting: false,
        successMessage: "",
        errorMessage: error.response?.data.message || "Bir hata oluştu.",
      });
    }
  };

  return (
    <div className="h-screen w-full">
      <Navbar />

      <div className="bg-gray-50">
        <section className="bg-white">
          <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              İşletmeniz İçin Modern Çözümler
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              DönerCRM ile tüm operasyonlarınızı tek bir yerden yönetin,
              verimliliğinizi artırın ve müşteri memnuniyetini en üst seviyeye
              taşıyın.
            </p>

            <a
              href="/signup"
              className="inline-block bg-red-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-700 transition-transform hover:scale-105 shadow-lg"
            >
              Hemen Başla
            </a>
          </div>
        </section>

        <section id="support" className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Neden Biz?</h2>

            <p className="text-gray-600 mt-2">
              Size sunduğumuz ayrıcalıklarla her zaman bir adım önde olun.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center transition-transform hover:scale-105 hover:shadow-lg">
              <Headset className="mx-auto size-12 text-red-600 mb-4" />

              <h3 className="text-xl font-bold mb-2">7/24 Destek</h3>

              <p className="text-gray-600">
                İhtiyaç duyduğunuz her an yanınızdayız. Uzman ekibimizle
                sorunlarınıza anında çözüm bulun.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center transition-transform hover:scale-105 hover:shadow-lg">
              <ShieldCheck className="mx-auto size-12 text-red-600 mb-4" />

              <h3 className="text-xl font-bold mb-2">Güvenli Altyapı</h3>

              <p className="text-gray-600">
                Verileriniz en güncel teknolojilerle korunur. Güvenliğiniz bizim
                için önceliktir.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center transition-transform hover:scale-105 hover:shadow-lg">
              <LifeBuoy className="mx-auto size-12 text-red-600 mb-4" />

              <h3 className="text-xl font-bold mb-2">Kolay Kullanım</h3>

              <p className="text-gray-600">
                Karmaşık arayüzlerden uzak, herkesin kolayca adapte olabileceği
                bir CRM deneyimi sunuyoruz.
              </p>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-white">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800">Bize Ulaşın</h2>

              <p className="text-gray-600 mt-2">
                Aklınızdaki sorular veya iş birliği teklifleri için formu
                doldurabilirsiniz.
              </p>
            </div>

            <div className="max-w-xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />

                  <input
                    type="text"
                    name="name"
                    placeholder="Adınız"
                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />

                  <input
                    type="email"
                    name="email"
                    placeholder="E-posta Adresiniz"
                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="relative">
                  <MessageSquare className="absolute left-3 top-4 size-5 text-gray-400" />

                  <textarea
                    placeholder="Mesajınız"
                    name="message"
                    rows="5"
                    className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:outline-none"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                {formStatus.successMessage && (
                  <p className="text-green-600 bg-green-100 p-3 rounded-lg text-center">
                    {formStatus.successMessage}
                  </p>
                )}

                {formStatus.errorMessage && (
                  <p className="text-red-600 bg-red-100 p-3 rounded-lg text-center">
                    {formStatus.errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full bg-red-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-700 transition-transform transform hover:scale-102 shadow-lg"
                >
                  {formStatus.isSubmitting
                    ? "Gönderiliyor..."
                    : "Mesajı Gönder"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
