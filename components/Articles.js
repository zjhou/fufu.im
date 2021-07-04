import React, { useState } from "react";
import { Row, Col, Space } from "antd";
import { ArticleCard } from "./ArticleCard";
import { HomeButton } from "./HomeButton";

import styles from "./Articles.module.scss";
import { PageScroller } from "./PageScroller";

export const Articles = () => {
  const [updateTime, setTime] = useState(Date.now());

  return (
    <Space direction="vertical" size={70} align="center">
      <PageScroller
        className={styles.articles}
        pagesCount={4}
        resetTime={updateTime}
      >
        <Space direction="vertical" size={70} align="center">
          <Row gutter={[70, 70]}>
            <Col className="gutter-row" span={6}>
              <ArticleCard coverURL="/1.png" />
            </Col>
            <Col className="gutter-row" span={6}>
              <ArticleCard coverURL="/2.png" />
            </Col>
            <Col className="gutter-row" span={6}>
              <ArticleCard coverURL="/3.png" />
            </Col>
            <Col className="gutter-row" span={6}>
              <ArticleCard coverURL="/4.png" />
            </Col>
          </Row>
          <Row gutter={[70, 70]}>
            <Col className="gutter-row" span={6}>
              <ArticleCard coverURL="/5.png" />
            </Col>
            <Col className="gutter-row" span={6}>
              <ArticleCard coverURL="/6.png" />
            </Col>
            <Col className="gutter-row" span={6}>
              <ArticleCard coverURL="/7.png" />
            </Col>
            <Col className="gutter-row" span={6}>
              <ArticleCard coverURL="/8.png" />
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
      </PageScroller>
      <HomeButton
        onClick={() => {
          setTime(Date.now());
        }}
      />
    </Space>
  );
};
