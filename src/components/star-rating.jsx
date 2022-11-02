/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import '../styles/rating.scss';
import { get, post } from '../helpers/plugins/https';

const StarRating = () => {
  const secret = localStorage.getItem('secret');

  const [rating, setRating] = useState(0);
  const [secretValid, setSecretValid] = useState(false);

  const validateSecret = async () => {
    // eslint-disable-next-line @typescript-eslint/quotes, @typescript-eslint/space-infix-ops, prefer-template
    const res = await get(`getSecret/`+secret);
    if (res.error === false) {
    setSecretValid(true);
  }
  };

  const ratingFunc = (index) => {
    if (secretValid === true) {
      setRating(index);
    } else {
      console.log('Please login to rate!');
    }
  };

  React.useEffect(() => {
    validateSecret();
  }, []);

    return (
      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={index <= (rating) ? 'on' : 'off'}
              onClick={() => ratingFunc(index)}
            >
              <span className="star">&#9733;</span>
            </button>
          );
        })}
      </div>
  );
};

export default StarRating;
