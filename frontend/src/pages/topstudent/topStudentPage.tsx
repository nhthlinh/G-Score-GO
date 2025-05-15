import { useEffect, useState } from "react";
import './topStudentPage.css';
import type { TopStudent } from "../../model/model";

const TopStudentPage = () => {
  const [students, setStudents] = useState<TopStudent[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:8080/golden-owl-test/public/top-students");
      const json = await res.json();
      setStudents(json);
    };
    fetchData();
  }, []);

  return (
    <div className="top-student-container">
      <h2>Top Thí Sinh Điểm Cao Nhất</h2>
      <table className="student-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>SBD</th>
            <th>Toán</th>
            <th>Vật Lý</th>
            <th>Hóa Học</th>
            <th>Ngoại Ngữ</th>
            <th>Tổng Điểm</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={student.sbd}>
              <td>{index + 1}</td>
              <td>{student.sbd}</td>
              <td>{student.toan}</td>
              <td>{student.vat_li}</td>
              <td>{student.hoa_hoc}</td>
              <td>{student.ma_ngoai_ngu}</td>
              <td>{student.tong_diem}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopStudentPage;
