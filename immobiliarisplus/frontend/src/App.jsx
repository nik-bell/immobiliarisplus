import './App.css';
import NotFoundPage from './component/NotFoundPage'
import PrivacyPolicy from './component/PrivacyPolicy'
import CookiePolicy from './component/CookiePolicy'

function App() {
  return (
    <>
      <div className='main-div'>
      <NotFoundPage></NotFoundPage>
      <PrivacyPolicy></PrivacyPolicy>
      <CookiePolicy></CookiePolicy>
    </div >
    </>
  )
}

export default App
