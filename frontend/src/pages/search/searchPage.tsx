import { useState } from 'react';
import './searchPage.css';
import { type Score } from '../../model/model';

const SearchPage = () => {
  const [sbd, setSbd] = useState('');
  const [data, setData] = useState<Score | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const validateSbd = (input: string): boolean => {
    // Giả định: SBD phải là số có ít nhất 8 chữ số
    return /^\d{8,}$/.test(input.trim());
  };

  const fetchData = async () => {
    const trimmedSbd = sbd.trim();
    if (!validateSbd(trimmedSbd)) {
      setError('Vui lòng nhập SBD hợp lệ (gồm ít nhất 8 chữ số)');
      setData(null);
      return;
    }

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch(`http://localhost:8080/golden-owl-test/public/score/${trimmedSbd}`);
      if (!res.ok) {
        throw new Error('Không tìm thấy học sinh có SBD này');
      }

      const result = await res.json();
      if (!result || !result.scores || Object.keys(result.scores).length === 0) {
        throw new Error('Không có dữ liệu điểm cho SBD này');
      }

      setData(result);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      fetchData();
    }
  };

  return (
    <div className="search-container">
      <h2>Tra cứu điểm thi</h2>

      <div className="input-group">
        <input
          type="text"
          placeholder="Nhập SBD..."
          value={sbd}
          onChange={(e) => setSbd(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
        />
        <button onClick={fetchData} disabled={loading}>
          {loading ? 'Đang tra cứu...' : 'Tra cứu'}
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {data && (
        <div className="score-table">
          <h3>Kết quả cho SBD: {data.sbd}</h3>
          <table>
            <thead>
              <tr>
                <th>Môn học</th>
                <th>Điểm</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(data.scores).map(([monHoc, diem]) => (
                <tr key={monHoc}>
                  <td>{monHoc}</td>
                  <td>{diem}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
