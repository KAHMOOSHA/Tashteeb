import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pagination } from 'antd';
import SingleCard from '../EngineerCard/SingleCard';
import '../EngineerCard/style.css';
import './style.css';

function EngineerInfo() {
  const [info, setInfo] = useState([]);
  const [total, setTotal] = useState();
  const [pageSize, setPageSize] = useState(6);
  const [page, setPage] = useState(1);
  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    const fetchEng = async () => {
      const getData = await axios.get('/api/engPage', {
        cancelToken: source.token,
        params: { pageSize, page },
      });
      const data = getData.data.data.rows;
      setTotal(getData.data.data.count);
      setInfo(data);
    };
    fetchEng();
    return () => source.cancel();
  }, [page, pageSize]);

  const handleChange = (newPage, newPageSize) => {
    setPageSize(newPageSize);
    setPage(newPage);
  };

  return (
    // {id: 3, email: 'enghefsdfdslles@helles.com', username: 'en
    <div className="engController">
      <div className="cardDetailes engineerInfo">
        {info.map((item) => (
          <SingleCard
            key={item.id}
            id={item.id}
            name={item.username}
            img={item.image}
          />
        ))}
      </div>
      <div className="paginationEng">
        <Pagination
          className="pagGng"
          defaultCurrent={1}
          defaultPageSize={pageSize}
          showSizeChanger
          total={total}
          onChange={handleChange}
          pageSizeOptions={[6, 9, 12, 21]}
        />
      </div>
    </div>
  );
}

export default EngineerInfo;
