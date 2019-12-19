import React, { FC, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { PageHeader, Tabs, Typography } from 'antd'
import classNames from 'classnames'
import GridContent from '@/components/PageHeader/GridContent'
import styles from './index.less'

const PageHeaderCopy: any = PageHeader
const { Title } = Typography

interface PageHeaderProps {
  children?: ReactNode;
  contentWidth?: string;
  fluid?: any;
  wrapperClassName?: string;
  home?: string;
  top?: ReactNode;
  title?: ReactNode;
  content?: ReactNode;
  logo?: ReactNode;
  extraContent?: ReactNode;
  hiddenBreadcrumb?: boolean;

  tabList?: Array<any>;
  tabActiveKey?: string;
  onTabChange?: (key: string) => void;
  tabBarExtraContent?: ReactNode;

  [key: string]: any;
}

const RenderFooter: FC<any> = ({ tabList, tabActiveKey, onTabChange, tabBarExtraContent }) => {
  return tabList && tabList.length ? (
    <Tabs
      className={styles.tabs}
      activeKey={tabActiveKey}
      onChange={key => {
        if (onTabChange) {
          onTabChange(key)
        }
      }}
      tabBarExtraContent={tabBarExtraContent}
    >
      {tabList.map((item: any) => (
        <Tabs.TabPane tab={item.tab} key={item.key}/>
      ))}
    </Tabs>
  ) : null
}

const PageHeaderWrapper: FC<PageHeaderProps> = ({ children, contentWidth, fluid, wrapperClassName, home, top, title, content, logo, extraContent, hiddenBreadcrumb, ...restProps }) => (
  <div style={{ margin: '-24px -24px 0' }} className={classNames(wrapperClassName, styles.main)}>
    {top}
    
    {children ? <div className={styles['children-content']}>
      <GridContent>{children}</GridContent>
    </div> : null}
  </div>
)

export default PageHeaderWrapper
