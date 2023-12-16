import { Route, Routes } from 'react-router-dom';
import Landing from '../pages/landing/Landing';
import RegisterURL from '../pages/registerURL/RegisterURL';
import Dashboard from '../pages/dashboard/Dashboard';

function CommonRouter() {

  return (
    <Routes>
      {/* 항상 렌더링되는 라우트 */}
      <Route path="/" element={<Landing />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="/registerurl" element={<RegisterURL />} />
      <Route path="/dashboard" element={<Dashboard />} />

      {/* 추가적인 라우트는 여기에 추가 */}
    </Routes>
  );
}

export default CommonRouter;
