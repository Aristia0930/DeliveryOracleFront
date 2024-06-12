import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const ShopMenuList = ({ menu }) => {
    //이름
    //가격
    //이미지주소
    //상점아이디

    const navigate = useNavigate();
    //수정버튼
    const editButton=()=>{
        navigate("/ShopMenuedit", { state: { menu: menu } });

    }

    


    
    return (
 
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={`/imgs/${menu.menuImage}`} />
      <Card.Body>
        <Card.Title>{menu.menuName}</Card.Title>
        <Card.Text>
        Price: {menu.menuPrice}
        </Card.Text>
        <Button variant="primary" className='menu_list' onClick={editButton}>수정</Button>
        <Button variant="primary">삭제</Button>
      </Card.Body>
    </Card>
            


            

    );
};

export default ShopMenuList;

