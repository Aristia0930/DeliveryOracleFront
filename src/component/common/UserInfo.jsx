import React, { useContext } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { FaUserCircle } from 'react-icons/fa'; // Using react-icons for the account circle icon
import { Link } from 'react-router-dom';
import { AdminFlagContext } from '../../flag/Flag';

const UserInfo = () => {

  const { setUser} = useContext(AdminFlagContext);

  const userlogout = (e) => {
    e.preventDefault();
    setUser(null);
    window.location.href = "/UserMain";
  };

  return (
    <Dropdown align="end">
      <Dropdown.Toggle variant="link" id="dropdown-basic">
        <FaUserCircle size={30} />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item as={Link} to="/MypageMain">내 정보</Dropdown.Item>
        <Dropdown.Item as={Link} to="/MyorderDetails">주문내역</Dropdown.Item>
        <Dropdown.Item as={Link} to="/MypageReview">리뷰관리</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={userlogout}>로그아웃</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserInfo;
