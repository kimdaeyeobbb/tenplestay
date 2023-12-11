import CommonRouter from './routes/CommonRouter';
import MainLayout from './layouts/MainLayout';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        {/* router가 있는 위치 */}
        {/* MainLayout의 children 자리에 들어가게 됨 */}
        <CommonRouter />
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
