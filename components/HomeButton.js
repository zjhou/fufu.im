import React from 'react';
import {HomeSquare} from "../icons";
import style from './HomeButton.module.scss';

export const HomeButton = () => {
  return (
    <div className={style.homeButton}>
      <HomeSquare />
    </div>
  );
}