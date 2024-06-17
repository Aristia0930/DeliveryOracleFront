import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import UserMenuCa from './UserMenuCa';
import Header from '../commom/Header';
import Search from '../commom/Search';


const UserMenuCaList = () => {
    const location = useLocation();
    const caInfo = location.state?.ca;
    const y = location.state?.y;
    const x = location.state?.x;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const rs = await axios.get("http://localhost:8080/search/CaList", {
                    params: { canum: caInfo ,x:x,y:y}
                });
                setData(rs.data);
                console.log(rs.data)
            } catch (e) {
                setError("연결실패");
                console.log("연결실패", e);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [caInfo]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const handleSearch = (term) => {
      setSearchTerm(term);
      // Perform search or update state accordingly
      console.log('검색어:', term);
    };

    return (
        <div>
            
            <Header/>
            
            {/* Render your data here {item.store_name} */}
            {/* {data && data.map(item => (
                
                <Link to={`/UserShopDetail`} state={{data:item}}> <UserMenuCa  data={item}></UserMenuCa></Link>
            ))} */}



                { data.reduce((acc, da, index) => {
                    // Every 4th item or the first item, create a new container
                    if (index % 2 === 0) {
                        acc.push([]);
                    }
                    // Add the current menu item to the last container
                    acc[acc.length - 1].push(da);
                    return acc;
                }, []).map((item, groupIndex) => (
                    <div id="shop_container" key={groupIndex}>
                        {item.map((items, index) => (
                            <Link to={`/UserShopDetail`} state={{data:items}}> <UserMenuCa  data={items}></UserMenuCa></Link>
                        ))}
                    </div>
                ))}

        </div>


    );
};

export default UserMenuCaList;
