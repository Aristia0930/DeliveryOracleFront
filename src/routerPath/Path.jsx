import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '../component/main/Main';
import UserMain from '../component/user/UserMain';
import ShopMain from '../component/shop/ShopMain';
import UserLogin from '../component/user/UserLogin';
import UserJoin from '../component/user/UserJoin';
import ShopJoin from '../component/shop/ShopJoin';
import ManagerMain from '../component/manager/ManagerMain';
import ManagerApprove from '../component/manager/ManagerApprove';
import ShopMenu from '../component/shop/ShopMenu';
import ShopMenuRs from '../component/shop/ShopMenuRs';
import ShopMenuList from '../component/shop/ShopMenuList';
import ShopMenuedit from '../component/shop/ShopMenuedit';
import UserMenuCaList from '../component/user/UserMenuCaList';
import UserShopDetail from '../component/user/UserShopDetail';
import ShopOrder from '../component/shop/ShopOrder';
import RiderMain from '../component/rider/RiderMain';
import RiderCall from '../component/rider/RiderCall';
import RiderOrder from '../component/rider/RiderOrder';
import RiderOrderList from '../component/rider/RiderOrderList';
import MypageMain from '../component/mypage/MypageMain';
import MyorderDetails from '../component/mypage/MyorderDetails';
import MypageComments from '../component/mypage/MypageComments';
import UserShopIntroduce from '../component/user/UserShopIntroduce';

const Path = () => {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/UserMain" element={<UserMain />} />
            <Route path="/ShopMain" element={<ShopMain />} />
            <Route path="/UserLogin" element={<UserLogin />} />
            <Route path="/UserJoin" element={<UserJoin />} />
            <Route path="/ShopJoin" element={<ShopJoin />} />
            <Route path="/ManagerMain" element={<ManagerMain />} />
            <Route path="/ManagerApprove" element={<ManagerApprove />} />
            <Route path="/ShopMenu" element={<ShopMenu />} />
            <Route path="/ShopMenuRs" element={<ShopMenuRs />} />
            <Route path="/ShopMenuList" element={<ShopMenuList />} />
            <Route path="/ShopMenuedit" element={<ShopMenuedit />} />
            <Route path="/UserMenuCaList" element={<UserMenuCaList />} />
            <Route path="/UserShopDetail" element={<UserShopDetail />} />
            <Route path="/ShopOrder" element={<ShopOrder />} />
            <Route path="/MypageMain" element={<MypageMain />} />
            <Route path="/MyorderDetails" element={<MyorderDetails/>} />
        
            <Route path="/RiderMain" element={<RiderMain />} />
            <Route path="/RiderCall" element={<RiderCall />} />
            <Route path="/RiderOrder" element={<RiderOrder />} />
            <Route path="/RiderOrderList" element={<RiderOrderList />} />
            <Route path="/MypageComments" element={<MypageComments />} />
            <Route path="/UserShopIntroduce" element={<UserShopIntroduce />} />
        </Routes>
        
            

    );
};

export default Path;