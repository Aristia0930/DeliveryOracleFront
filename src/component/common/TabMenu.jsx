import React from 'react';

const TabMenu = () => {
  return (
    <ul className="nav nav-tabs nav-menu">
      <li className="nav-item">
        <a className="nav-link active" href="#">한식</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">중식</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">일식</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">치킨</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">피자</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">분식</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">디저트</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">패스트푸드</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">프렌차이즈</a>
      </li>
    </ul>
  );
};

export default TabMenu;
