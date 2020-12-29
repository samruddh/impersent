import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Check out the facts about GOT Battle!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img-3.jpg'
              text='Locations of battle'
              label='Location'
              path='/location'
            />
            <CardItem
              src='images/count.jpg'
              text='Count Of battle'
              label='Count'
              path='/count'
            />
            <CardItem
              src='images/img-8.jpg'
              text='Search the infromation'
              label='Search'
              path='/search'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
