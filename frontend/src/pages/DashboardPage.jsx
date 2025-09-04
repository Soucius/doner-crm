import { useState, useEffect } from "react";

const DashboardPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800">
        Hoşgeldin, <span className="text-red-600">{user.user_name}</span>!
      </h1>
      <p className="mt-2 text-gray-600">
        İstatistiklerini ve genel durumu buradan takip edebilirsin.
      </p>
    </div>
  );
};

export default DashboardPage;
