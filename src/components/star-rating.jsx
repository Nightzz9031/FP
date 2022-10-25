/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import '../styles/rating.scss';
import { get, post } from '../helpers/plugins/https';

const StarRating = () => {
  const [rating, setRating] = useState(0);

  const validateSecret = async (secret) => {
    if (secret) {
    // eslint-disable-next-line @typescript-eslint/quotes, @typescript-eslint/space-infix-ops, prefer-template
    const res = await get(`getSecret/`+secret);
    return res;
    }
  };

  const checkSecret = (index) => {
    const secret = localStorage.getItem('secret');

    if (secret) {
      setRating(index);
    } else {
      console.log('Please login to rate');
    }
    };
    return (
      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={index <= (rating) ? 'on' : 'off'}
              onClick={() => checkSecret(index)}
              onDoubleClick={() => { setRating(0); }}
            >
              <span className="star">&#9733;</span>
            </button>
          );
        })}
      </div>
  );
};

export default StarRating;
