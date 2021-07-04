import React from 'react';
import {Box} from "../icons";
import style from './BoxLoader.module.scss';

export const BoxLoader = () => {
  return (
    <div className={style.loader}>
      <Box />
    </div>
  )
}