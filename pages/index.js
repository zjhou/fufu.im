import { NeoLoading } from '../components/NeoLoading';

export default function Home() {
  return (
    <div className="container">
      <main>
        <div className="logo">
          <img src="/lauch_img_cat.svg" alt=""/>
        </div>
        <div className="title">
          <div className="main-title">FUFU.IM</div>
          <div className="sub-title">MOON'S BLOG</div>
        </div>
        <div className="loading">
          <NeoLoading />
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
          margin: 110px 0;
        }
      `}</style>

      <style jsx global>{`
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
      `}</style>
    </div>
  )
}
