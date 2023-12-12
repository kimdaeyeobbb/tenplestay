import Header from '../components/layout/header/Header';
import Footer from '../components/layout/footer/Footer';
import Navbar from '../components/layout/navbar/Navbar';

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Navbar />
        <div className="flex flex-col  w-screen">
          <main className="flex flex-1 bg-white">
            {/* children이 여기에 렌더링됨 */}
            {children}
          </main>
          <div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
