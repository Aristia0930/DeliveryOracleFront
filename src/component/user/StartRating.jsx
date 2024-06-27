import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const StarRating = ({ initialRating }) => {
    const [rating, setRating] = useState(initialRating);



    return (
        <div>
            {[...Array(5)].map((star, index) => {
                const starValue = index + 1;
                return (
                    <label key={index}>
                        <input
                            type="radio"
                            name="rating"
                            value={starValue}
                            style={{display:'none'}}
                        />
                        <FaStar
                            className="star"
                            color={starValue <= rating ? '#ffc107' : '#e4e5e9'}
                            size={25}
                        />
                    </label>
                );
            })}
        </div>
    );
};

export default StarRating;