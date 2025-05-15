import { useEffect, useState } from "react";
import type { Report } from "../../model/model";
import './reportPage.css';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts';


const subjectNames: Record<string, string> = {
  toan: "Toán",
  ngu_van: "Ngữ Văn",
  ngoai_ngu: "Ngoại Ngữ",
  vat_li: "Vật Lý",
  hoa_hoc: "Hóa Học",
  sinh_hoc: "Sinh Học",
  lich_su: "Lịch Sử",
  dia_li: "Địa Lý",
  gdcd: "GDCD"
};

const ReportPage = () => {
  const [data, setData] = useState<Report | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string>("toan");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedSubject.trim()) return;

      try {
        const res = await fetch(`http://localhost:8080/golden-owl-test/public/report/${selectedSubject}`);
        if (!res.ok) {
          throw new Error('Không tìm thấy môn học');
        }
        const result = await res.json();
        setData(result);
        setError(null);
      } catch (err) {
        setData(null);
        setError((err as Error).message);
      }
    };
    fetchData();
  }, [selectedSubject]); 

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSubject(e.target.value);
  };

  return (
    <div className="user-list">
      <h2>Thống kê</h2>

      <div className="select-container">
        <label htmlFor="subject-select">Chọn môn: </label>
        <select id="subject-select" value={selectedSubject} onChange={handleSelectChange}>
          {Object.keys(subjectNames).map((key) => (
            <option key={key} value={key}>
              {subjectNames[key]}
            </option>
          ))}
        </select>
      </div>

      {data && data.report && (
        <div className="chart">
          <h4>{subjectNames[selectedSubject]}:</h4>

          {/* Biểu đồ */}
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={[
                { name: "8+", value: data.report["8+"] },
                { name: "6-8", value: data.report["6-8"] },
                { name: "4-6", value: data.report["4-6"] },
                { name: "<4", value: data.report["4-"] }
              ]}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#167FAA" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}


    </div>
  );
};

export default ReportPage;

