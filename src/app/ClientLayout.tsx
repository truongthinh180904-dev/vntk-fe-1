'use client';

import { usePathname } from 'next/navigation';
import LoadingOverlay from './components/load/LoadingOverlay';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ContactFloatingButton from './components/contact/ContactFloatingButton';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // ✅ CHỈ bật LoadingOverlay cho các route này
  const loadingRoutes = ['/lien-he'];

  // ✅ Route KHÔNG cần Header/Footer
  const noLayoutRoutes = ['/dang-nhap', '/dang-ky'];

  const showLoading = loadingRoutes.some(
    route => pathname === route || pathname.startsWith(route + '/')
  );

  const hideLayout = noLayoutRoutes.some(
    route => pathname.startsWith(route)
  );

  return (
    <>
      <div className="d-flex flex-column min-vh-100"> 
      {/* - d-flex: Kích hoạt flexbox
          - flex-column: Sắp xếp các phần tử theo cột dọc
          - min-vh-100: Ép chiều cao tối thiểu bằng 100% màn hình
      */}
      
      {showLoading && <LoadingOverlay />}
      <ContactFloatingButton />

      {!hideLayout && <Header />}

      <main className="flex-grow-1">
        {/* flex-grow-1: Thẻ main sẽ tự động giãn ra để lấp đầy khoảng trống thừa */}
        {children}
      </main>

      {!hideLayout && <Footer />}
    </div>
    </>
  );
}



// 'use client';

// import { usePathname } from 'next/navigation';
// import LoadingOverlay from './components/load/LoadingOverlay';
// import Header from './components/layout/Header';
// import Footer from './components/layout/Footer';
// import ContactFloatingButton from './components/contact/ContactFloatingButton';

// export default function ClientLayout({ children }: { children: React.ReactNode }) {
//   const pathname = usePathname();

//   // ✅ Route KHÔNG cần LoadingOverlay
//   const excludedRoutes = ['/tim-kiem-chuyen-bay'];

//   // ✅ Route KHÔNG cần Header/Footer
//   const noLayoutRoutes = ['/dang-nhap', '/dang-ky'];

//   const showLoading = !excludedRoutes.some(route => pathname.startsWith(route));
//   const hideLayout = noLayoutRoutes.some(route => pathname.startsWith(route));

//   return (
//     <>
//       {showLoading && <LoadingOverlay />}
//       <ContactFloatingButton />
//       {/* Nếu không thuộc các route cần ẩn layout thì render Header/Footer */}
//       {!hideLayout && <Header />}
     
//       <main>{children}</main>
//       {!hideLayout && <Footer />}
//     </>
//   );
// }
