import axios from 'axios';
import Button from 'react-bootstrap/Button';
import React, { useEffect, useState } from 'react';
import AddressP from './AddressP';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

const ShopJoin = () => {
    

    //상점이름
    const [name,setName]=useState("")
    //주소
    const[address,setAddress]=useState({
        address:'',
    });
    //가게설명
    const[text,setTest]=useState("")
    //이미지
    const[img,setImg]=useState()
        //  x,y좌표
    const [query, setQuery] = useState('');
    const [coordinates, setCoordinates] = useState([]);

    //옵션
    const [category,setcategory]=useState("")

    //후에 해야할거 x,y 좌표 넘기기와 주소받아오기

    const shopjoin=async(e)=>{
        e.preventDefault();
        handleSearch()
        const formData = new FormData();
        formData.append("#백에서받을이름",name)
        formData.append("#백에서받을이름",address)
        formData.append("#백에서받을이름",text)
        formData.append("#백에서받을이름",img)
        formData.append("#백에서받을이름",coordinates[0].x)
        formData.append("#백에서받을이름",coordinates[0].y)
        formData.append("#백에서받을이름",category)

        try{
            const rs=await axios.post("주소", formData)
            if(rs.status==200){
                alert("넘기기는 성공")
            }
        }catch(e){
            console.log("등록실패",e)
        }
    }

    //주소찾기 팝업
    const [popup, setPopup] = useState(false);
    
    const handleInput = (e) => {
        setAddress({
            ...address,
            [e.target.name]:e.target.value,
        })
    }
    
    const handleComplete = (data) => {
        setPopup(!popup);
    }

    useEffect(()=>{
        handleSearch()


    },[address])



    //x,y좌표 받아오기

  const handleSearch = async () => {

    console.log(address)
    try {
      const response = await axios.get('https://dapi.kakao.com/v2/local/search/address.json', {
        headers: {
          Authorization: 'KakaoAK a7c586e0ddf3d0e749012d67cfc6dcdd'
        },
        params: {
          query: address.address
        }
      });

      const coords = response.data.documents.map(doc => ({
        x: doc.x,
        y: doc.y
      }));

      setCoordinates(coords);
    } catch (error) {
      console.error('Error fetching data from Kakao API:', error);
    }
  };

    
    return (
        <div>

<div id="main_container">
    
    <div class="shop_container">

        <div class="form">


            <form action="#">
                <p class="shop_name">
                    <label for="shop_name">업체이름</label>
                    <input type="text" id="shop_name" onChange={(e)=>setName(e.target.value)}/>
                </p>
                <p>
                <label for="shop_name">주소 <Button variant="primary" size="sm" onClick={handleComplete}>주소 찾기</Button>{' '}</label>
                <input className="user_enroll_text" placeholder="주소"  type="text" required={true} name="address" onChange={handleInput} value={address.address}/>
                
                {popup && <AddressP company={address} setcompany={setAddress}></AddressP>}
             
                </p>


                <p class="shop_text">
                    <label for="shop_text">업체설명</label>
                    <textarea name="postContent" rows={6} onChange={(e)=>setTest(e.target.value)}/>
                </p>

                <p class="shop_category">
                <label for="shop_category">카테고리</label>
                  <Form.Select aria-label="Default select example"  onChange={(e)=>setcategory(e.target.value)}>
                    <option>카테고리 선택</option>
                    <option value="1">한식</option>
                    <option value="2">치킨</option>
                    <option value="3">중국집</option>
                  </Form.Select>
                </p>



                <p class="shop_img">
                    <label for="shop_img">업체이미지</label>
                    <input type="file" required="required/" accept="image/*" onChange={(e)=>setImg(e.target.value)}/>
                </p>
                <div className="d-grid gap-2">
                <Button variant="primary" type="submit" id="submit_btn" class="submit_btn" onClick={shopjoin}>등록하기</Button>
                </div>
            </form>



            <ul>
        {coordinates.map((coord, index) => (
          <li key={index}>
            X: {coord.x}, Y: {coord.y}
          </li>

        ))}
      </ul>



</div>

</div>

</div>
            
        </div>
    );
};

export default ShopJoin;