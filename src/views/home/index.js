import React from 'react';
import { Layout } from 'antd';

import SiderMenu from '@components/SiderMenu/index'
import GlobalHeader from '@components/GlobalHeader/index'
import HomeRouter from '@router/homeRouter'
import Footer from '@components/Footer/index'

class Home extends React.Component {
  
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <SiderMenu {...this.props} />
        
        <Layout>
          <GlobalHeader 
            history={this.props.history}
          />
          <HomeRouter />
          <Footer />
        </Layout>
      </Layout>
    );
  }
}

export default Home; 
