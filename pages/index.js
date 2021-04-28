import Head from 'next/head'
import { useState } from "react";
import { ConfigProvider } from 'antd';
import {BoxLoader} from "../components/BoxLoader";

import 'antd/dist/antd.css'
import {Articles} from "../components/Articles";
import {Logo} from "../icons";


export default function Home() {
  const [loading, setLoading] = useState(true);

  const promise20 = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000)
    })
  };

  const promise26 = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1.3 * 1000 * 2.5)
    })
  }

  const p = Promise.all([
    promise20(),
    promise26()
  ]);

  p.then(() => {
    setLoading(false);
  });

  const content = (
    <div className="container">
      <Head>
        <title>Moon's Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        loading ? null : <img src="/box.png" className="logo" width={48} />
      }
      <main>
        <div className="loading">
          {loading
            ? <BoxLoader />
            : <Articles />
          }
        </div>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        
        main .title {
          text-align: center
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #8A8A8A;
        }
       
        main .title > .main-title {
          font-size: 32px;
          margin-bottom: 4px;
        }
        
        main .title > .sub-title {
          text-align: center;
          font-size: 14px;
        }
        
        main .loading {
          margin-bottom: 70px;
        }        
      `}</style>

      <style jsx global>{`
        .logo {
          position: absolute;
          top: 60px;
          left: 60px;
        }
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, PingFangSC-Regular, PingFang SC, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
        
        @keyframes loaderColor {
          from {
            stroke: #e3e3e3;
          }
          to {
            stroke: #414141;
          }
        }
      `}</style>
    </div>
  );
  return (
    <ConfigProvider>
      {content}
    </ConfigProvider>
  )
}
