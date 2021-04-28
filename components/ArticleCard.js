import React from 'react';
import { Space } from "antd";
import {ArrowDownRight} from "../icons";

import styles from './ArticleCard.module.scss'

export const ArticleCard = (props) => {
  const {
    title = '艺术家的病',
    coverURL = 'http://source.unsplash.com/200x200',
    pageView = 3,
  } = props;
  return (
    <div>
      <Space direction="vertical" size={17} align="start">
        <Space size={20} align="start">
          <div className={styles.title}>{title}</div>
          <div className={styles.cover}>
            { coverURL ? <img src={coverURL} alt="?"/> : null }
          </div>
        </Space>
        <div className={styles.toolbar}>
          <ArrowDownRight />
          <div className={styles.counter}>{pageView}</div>
        </div>
      </Space>
    </div>
  )
}