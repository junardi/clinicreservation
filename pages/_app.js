
import 'bootstrap/scss/bootstrap.scss';
import '../styles/global.scss';

import { SessionProvider } from "next-auth/react";
import AuthGuard from '../guards/authguard';

export default function App({ Component, pageProps }) {

  const Layout = Component.layout || (({ children }) => <>{children}</>);
  return (
    <SessionProvider session={pageProps.session}>
      <AuthGuard>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthGuard>
    </SessionProvider>
  )
}
