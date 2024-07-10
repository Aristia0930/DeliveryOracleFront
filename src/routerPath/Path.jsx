import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from '../component/main/Main';
import UserMain from '../page/userPage/UserMain';
import ShopMain from '../page/shopPage/ShopMain';
import UserLogin from '../page/userPage/UserLogin';
import UserJoin from '../page/userPage/UserJoin';
import ShopJoin from '../page/shopPage/ShopJoin';
import ManagerMain from '../page/managerPage/ManagerMain';
import ManagerApprove from '../page/managerPage/ManagerApprove';
import ManagerOrderReceipt from '../page/managerPage/ManagerOrderReceipt';
import ManagerRevenue from '../page/managerPage/ManagerRevenue';
import ShopMenu from '../page/shopPage/ShopMenu';
import ShopMenuRs from '../page/shopPage/ShopMenuRs';
// import ShopMenuList from '../component/shop/ShopMenuList';
import ShopMenuedit from '../page/shopPage/ShopMenuedit';
import UserMenuCaList from '../page/userPage/UserMenuCaList';
import UserShopDetail from '../page/userPage/UserShopDetail';
import ShopOrder from '../page/shopPage/ShopOrder';
import RiderMain from '../page/riderPage/RiderMain';
import RiderCall from '../page/riderPage/RiderCall';
import RiderOrder from '../page/riderPage/RiderOrder';
import RiderOrderList from '../component/rider/RiderOrderList';
import RiderOrderReceipt from '../page/riderPage/RiderOrderReceipt';
import RiderOrderReceiptList from '../component/rider/RiderOrderReceiptList';
import RiderRechart from '../component/rider/RiderRechart';
import RiderRevenue from '../page/riderPage/RiderRevenue';
import MypageMain from '../page/mypage/MypageMain';
import MyorderDetails from '../page/mypage/MyorderDetails';
import ShopOrderReceipt from '../component/shop/ShopOrderReceipt';
import ShopRevenue from '../page/shopPage/ShopRevenue';
import MypageUserEdit from '../page/mypage/MypageUserEdit';
import UserSearchList from '../page/userPage/UserSearchList';
import MypageComments from '../page/mypage/MypageComments';
import UserShopIntroduce from '../page/userPage/UserShopIntroduce';
import ShopEdit from '../page/shopPage/ShopEdit';
import UserShopComment from '../page/userPage/UserShopComment';
import ShopComment from '../page/shopPage/ShopComment';
import ManagerUserblock from '../page/managerPage/ManagerUserblock';
import MypageReview from '../page/mypage/MypageReview';
import ShopCommentText from '../component/shop/ShopCommentText';
import ManagerShopleave from '../page/managerPage/ManagerShopleave';
import ShopUserJoin from '../page/shopPage/ShopUserJoin';
import ShopUserLogin from '../page/shopPage/ShopUserLogin';
import ManagerUserJoin from '../page/managerPage/ManagerUserJoin';
import ManagerUserLogin from '../page/managerPage/ManagerUserLogin';
import RiderUserJoin from '../page/riderPage/RiderUserJoin';
import RiderUserLogin from '../page/riderPage/RiderUserLogin';
import ShopMyPage from '../page/shopPage/ShopMyPage';
import ShopMyPagemodify from '../component/shop/ShopMyPagemodify';
import RiderMyPage from '../page/riderPage/RiderMyPage';
import RiderMyPagemodify from '../component/rider/RiderMyPagemodify';
import ManagerMyPagemodify from '../component/manager/ManagerMyPagemodify';
import MypageReviewEdit from '../page/mypage/MypageReviewEdit';
import UserAiList from '../page/userPage/UserAiList';
import PaySection from '../page/userPage/PaySection';

const Path = () => {
    return (
        <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/UserMain" element={<UserMain />} />
            <Route path="/UserLogin" element={<UserLogin />} />
            <Route path="/UserJoin" element={<UserJoin />} />
            <Route path="/UserMenuCaList" element={<UserMenuCaList />} />
            <Route path="/UserShopDetail" element={<UserShopDetail />} />
            <Route path="/PaySection" element={<PaySection />} />

            <Route path="/ManagerMain" element={<ManagerMain />} />
            <Route path="/ManagerApprove" element={<ManagerApprove />} />
            <Route path="/ManagerOrderReceipt" element={<ManagerOrderReceipt />} />
            <Route path="/ManagerRevenue" element={<ManagerRevenue />} />
            <Route path="/ManagerMyPagemodify" element={<ManagerMyPagemodify />} />

            <Route path="/ShopJoin" element={<ShopJoin />} />
            <Route path="/ShopMain" element={<ShopMain />} />
            <Route path="/ShopMenu" element={<ShopMenu />} />
            <Route path="/ShopMenuRs" element={<ShopMenuRs />} />
            {/* <Route path="/ShopMenuList" element={<ShopMenuList />} /> */}
            <Route path="/ShopMenuedit" element={<ShopMenuedit />} />
            <Route path="/ShopOrder" element={<ShopOrder />} />
            <Route path="/ShopOrderReceipt" element={<ShopOrderReceipt/>} />
            <Route path="/ShopRevenue" element={<ShopRevenue/>} />
            <Route path="/ShopMyPage" element={<ShopMyPage/>} />
            <Route path="/ShopMyPagemodify" element={<ShopMyPagemodify/>} />

            <Route path="/MypageMain" element={<MypageMain />} />
            <Route path="/MyorderDetails" element={<MyorderDetails/>} />
            <Route path="/MypageUserEdit" element={<MypageUserEdit/>} />
            <Route path="/MypageReviewEdit" element={<MypageReviewEdit/>} />
            
            <Route path="/RiderMain" element={<RiderMain />} />
            <Route path="/RiderCall" element={<RiderCall />} />
            <Route path="/RiderOrder" element={<RiderOrder />} />
            {/* <Route path="/RiderOrderList" element={<RiderOrderList />} /> */}
            <Route path="/RiderOrderReceipt" element={<RiderOrderReceipt />} />
            {/* <Route path="/RiderOrderReceiptList" element={<RiderOrderReceiptList />} /> */}
            {/* <Route path="/RiderRechart" element={<RiderRechart />} /> */}
            <Route path="/RiderRevenue" element={<RiderRevenue />} />
            <Route path="/RiderMyPage" element={<RiderMyPage />} />
            <Route path="/RiderMyPagemodify" element={<RiderMyPagemodify />} />
            


            <Route path="/MypageComments" element={<MypageComments />} />
            <Route path="/UserShopIntroduce" element={<UserShopIntroduce />} />

            <Route path="/UserSearchList" element={<UserSearchList />} />
            <Route path="/ShopEdit" element={<ShopEdit />} />
            <Route path="/UserShopComment" element={<UserShopComment />} />
            <Route path="/ShopComment" element={<ShopComment />} />

            <Route path="/ManagerUserblock" element={<ManagerUserblock />} />

            <Route path="/MypageReview" element={<MypageReview />} />
            <Route path="/ShopCommentText" element={<ShopCommentText />} />
            <Route path="/ManagerShopleave" element={<ManagerShopleave />} />

            <Route path="/ShopUserJoin" element={<ShopUserJoin />} />
            <Route path="/ShopUserLogin" element={<ShopUserLogin />} />

            <Route path="/ManagerUserJoin" element={<ManagerUserJoin />} />
            <Route path="/ManagerUserLogin" element={<ManagerUserLogin />} />

            <Route path="/RiderUserJoin" element={<RiderUserJoin />} />
            <Route path="/RiderUserLogin" element={<RiderUserLogin />} />

            <Route path="/UserAiList" element={<UserAiList />} />
        </Routes>
        
            

    );
};

export default Path;