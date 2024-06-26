import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AdminFlagContext } from "../../flag/Flag.jsx";

const RiderRechart = () => {
  const { userId } = useContext(AdminFlagContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/rider/riderRevenue", {
          params: { riderId: userId }
        });

        if (response.status === 200) {
          console.log("매출 내역 조회 결과:", response.data);
          const processedData = processSalesData(response.data); // 매출 데이터 가공 함수 호출
          setData(processedData);
        } else {
          console.log("매출 내역 없음");
          setData([]); // 데이터가 없을 경우 빈 배열로 설정합니다.
        }
      } catch (error) {
        console.error("매출 내역 조회 실패:", error);
        setData([]); // 에러 발생 시 빈 배열로 설정합니다.
      }
    };
    fetchData();
  }, [userId]); // userId가 변경될 때마다 데이터 다시 불러오기

  const processSalesData = (salesData) => {
    const salesByDate = salesData.reduce((acc, sale) => {
      
      const koreanDate = new Date(new Date(sale.orderDate).getTime() + (9 * 60 * 60 * 1000));
      console.log(koreanDate.toISOString())
      const date = koreanDate.toISOString().split('T')[0]; // 날짜만 추출
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += sale.deliveryPrice;
      return acc;
    }, {});

    // 객체를 배열로 변환하고 날짜를 기준으로 정렬
    return Object.keys(salesByDate)
      .map(date => ({
        orderDate: date,
        deliveryPrice: salesByDate[date]
      }))
      .sort((a, b) => new Date(a.orderDate) - new Date(b.orderDate));
  };

  // 매출 데이터를 받아서 그래프에 맞게 가공하는 함수
//   const processSalesData = (data) => {
//     return data.map(item => ({
//       order_date: item.delivery_id, 
//       deliveryPrice: item.deliveryPrice
    
//     }));
//   };

  return (
    <div style={{ width: '100%' }}>
      <h4>라이더 일 단위 매출내역 그래프</h4>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          width={500}
          height={200}
          data={data}
          syncId="anyId"
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="orderDate" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="deliveryPrice" stroke="#ff7f00" fill="#ff7f00" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RiderRechart;


// const processSalesData = (salesData) => {
//     const salesByDate = salesData.reduce((acc, sale) => {
      
//       const koreanDate = new Date(new Date(sale.order_date).getTime() + (9 * 60 * 60 * 1000));
//       console.log(koreanDate.toISOString())
//       const date = koreanDate.toISOString().split('T')[0]; // 날짜만 추출
//       if (!acc[date]) {
//         acc[date] = 0;
//       }
//       acc[date] += sale.total_price;
//       return acc;
//     }, {});

//     // 객체를 배열로 변환하고 날짜를 기준으로 정렬
//     return Object.keys(salesByDate)
//       .map(date => ({
//         order_date: date,
//         total_price: salesByDate[date]
//       }))
//       .sort((a, b) => new Date(a.order_date) - new Date(b.order_date));
//   };
