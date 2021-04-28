import React from 'react';
import {Row, Col, Space} from "antd";
import {ArticleCard} from "./ArticleCard";
import {HomeButton} from "./HomeButton";

import styles from './Articles.module.scss';

export const Articles = () => {
  return (
    <Space direction="vertical" size={70} align="center">
      <div className={styles.articles}>
        <Space direction="vertical" size={70} align="center">
          <Row gutter={[70, 70]}>
            <Col className="gutter-row" span={6}>
              <ArticleCard />
            </Col>
            <Col className="gutter-row" span={6}>
              <ArticleCard />
            </Col>
            <Col className="gutter-row" span={6}>
              <ArticleCard />
            </Col>
            <Col className="gutter-row" span={6}>
              <ArticleCard />
            </Col>
          </Row>
          <Row gutter={[70, 70]}>
            <Col className="gutter-row" span={6}>
              <ArticleCard />
            </Col>
            <Col className="gutter-row" span={6}>
              <ArticleCard />
            </Col>
            <Col className="gutter-row" span={6}>
              <ArticleCard />
            </Col>
            <Col className="gutter-row" span={6}>
              <ArticleCard />
            </Col>
          </Row>
          <Row gutter={[70, 70]}>
            <Col className="gutter-row" span={6}>
              <ArticleCard />
            </Col>
            <Col className="gutter-row" span={6}>
              <ArticleCard />
            </Col>
            <Col className="gutter-row" span={6}>
              <ArticleCard />
            </Col>
            <Col className="gutter-row" span={6}>
              <ArticleCard />
            </Col>
          </Row>
          <Row gutter={[70, 70]}>
            <Col className="gutter-row" span={6}>
              <ArticleCard />
            </Col>
            <Col className="gutter-row" span={6}>
              <ArticleCard />
            </Col>
            <Col className="gutter-row" span={6}>
              <ArticleCard />
            </Col>
            <Col className="gutter-row" span={6}>
              <ArticleCard />
            </Col>
          </Row>
          <Row gutter={[70, 70]}>
            <Col className="gutter-row" span={6}>
              <ArticleCard />
            </Col>
            <Col className="gutter-row" span={6}>
              <ArticleCard />
            </Col>
            <Col className="gutter-row" span={6}>
              <ArticleCard />
            </Col>
            <Col className="gutter-row" span={6}>
              <ArticleCard />
            </Col>
          </Row>
          <Row gutter={[70, 70]}>
            <Col className="gutter-row" span={6}>
              <ArticleCard />
            </Col>
            <Col className="gutter-row" span={6}>
              <ArticleCard />
            </Col>
            <Col className="gutter-row" span={6}>
              <ArticleCard />
            </Col>
            <Col className="gutter-row" span={6}>
              <ArticleCard />
            </Col>
          </Row>
          <Row gutter={[70, 70]}>
            <Col className="gutter-row" span={6}>
              <ArticleCard />
            </Col>
            <Col className="gutter-row" span={6}>
              <ArticleCard />
            </Col>
            <Col className="gutter-row" span={6}>
              <ArticleCard />
            </Col>
            <Col className="gutter-row" span={6}>
              <ArticleCard />
            </Col>
          </Row>
        </Space>
      </div>
      <HomeButton />
    </Space>
  )
}
