import React, { useEffect, useRef, useState } from 'react';
import './Slider.css';

const MSlider = () => {
    const carouselRef = useRef(null);
    const [selectedIdx, setSelectedIdx] = useState(3);

    const moveToSelected = (element) => {
        let idx;

        if (element === "next") {
            idx = selectedIdx + 1;
        } else if (element === "prev") {
            idx = selectedIdx - 1;
        } else {
            idx = element;
        }

        if (idx < 0) {
            idx = carouselRef.current.children.length - 1;
        } else if (idx >= carouselRef.current.children.length) {
            idx = 0;
        }

        setSelectedIdx(idx);
    };

    const handleKeydown = (e) => {
        if (e.key === "ArrowLeft") {
            moveToSelected('prev');
        } else if (e.key === "ArrowRight") {
            moveToSelected('next');
        }
    };

    useEffect(() => {
        const currentCarousel = carouselRef.current;
        if (currentCarousel) {
            currentCarousel.addEventListener('keydown', handleKeydown);
            return () => {
                currentCarousel.removeEventListener('keydown', handleKeydown);
            };
        }
    }, [selectedIdx]);

    const getClass = (index) => {
        if (index === selectedIdx) return 'selected';
        if (index === selectedIdx - 1) return 'prev';
        if (index === selectedIdx + 1) return 'next';
        if (index === selectedIdx - 2) return 'prevLeftSecond';
        if (index === selectedIdx + 2) return 'nextRightSecond';
        return index < selectedIdx ? 'hideLeft' : 'hideRight';
    };

    return (
        <div className="slider-container">
            <div className="item-recommend">
                <div className="crossline"></div>
                <h1>오늘은 이거 어때요?</h1>
                <div className="item item01">
                    <h1>맛있는 것만 <span className="highlight-style01"><strong>#덮고<span className="highlight-style02">♬</span>비벼요!</strong></span></h1>
                </div>
            </div>
            <div id="carousel" className="codepen-carousel" ref={carouselRef} tabIndex="0" style={{ outline: 'none' }}>
                {Array.from(Array(7).keys()).map((item, index) => (
                    <div
                        key={index}
                        className={getClass(index)}
                        onClick={() => moveToSelected(index)}
                    >
                        <img src="asset/img/item-recommend.png" alt="추천" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MSlider;


// import React, { useEffect, useRef, useState } from 'react';
// import './Slider.css';

// const Slider = () => {
//     const carouselRef = useRef(null);
//     const [selectedIdx, setSelectedIdx] = useState(3);

//     const moveToSelected = (element) => {
//         let idx;

//         if (element === "next") {
//             idx = selectedIdx + 1;
//         } else if (element === "prev") {
//             idx = selectedIdx - 1;
//         } else {
//             idx = element;
//         }

//         if (idx < 0) {
//             idx = carouselRef.current.children.length - 1;
//         } else if (idx >= carouselRef.current.children.length) {
//             idx = 0;
//         }

//         setSelectedIdx(idx);
//     };

//     const handleKeydown = (e) => {
//         if (e.key === "ArrowLeft") {
//             moveToSelected('prev');
//         } else if (e.key === "ArrowRight") {
//             moveToSelected('next');
//         }
//     };

//     useEffect(() => {
//         const currentCarousel = carouselRef.current;
//         if (currentCarousel) {
//             currentCarousel.addEventListener('keydown', handleKeydown);
//             // 컴포넌트 언마운트 시 이벤트 리스너 제거
//             return () => {
//                 currentCarousel.removeEventListener('keydown', handleKeydown);
//             };
//         }
//     }, [selectedIdx]);

//     const getClass = (index) => {
//         if (index === selectedIdx) return 'selected';
//         if (index === selectedIdx - 1) return 'prev';
//         if (index === selectedIdx + 1) return 'next';
//         if (index === selectedIdx - 2) return 'prevLeftSecond';
//         if (index === selectedIdx + 2) return 'nextRightSecond';
//         return index < selectedIdx ? 'hideLeft' : 'hideRight';
//     };

//     return (
//         <div>
//             <div className="item-recommend">
//                 <div className="crossline"></div>
//                 <h1>오늘은 이거 어때요?</h1>
//                 <div className="item item01">
//                     <h1>맛있는 것만 <span className="highlight-style01"><strong>#덮고<span className="highlight-style02">♬</span>비벼요!</strong></span></h1>
//                     <div id="carousel" className="codepen-carousel" ref={carouselRef} tabIndex="0" style={{ outline: 'none' }}>
//                         {Array.from(Array(7).keys()).map((item, index) => (
//                             <div
//                                 key={index}
//                                 className={getClass(index)}
//                                 onClick={() => moveToSelected(index)}
//                             >
//                                 <img src="asset/img/item-recommend.png" alt="추천" />
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//             <div className="crossline"></div>
//         </div>
//     );
// };

// export default Slider;