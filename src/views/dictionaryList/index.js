import React from 'react';
import { Layout, Breadcrumb, Tree, Input, Button } from 'antd';
import AntdEmpty from '@components/ant/Empty/Empty'
import { SelectDictionary } from "@/services/api";
import styles from "./style.module.less";

const { Content } = Layout;
const { TreeNode } = Tree;
const { Search } = Input;


const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};

const setTreeKey = (data, _preKey) => {
  const preKey = _preKey || '0';
  data.map((item, index) => {
    item.key = `${preKey}-${index}`;
    if (item.children) {
      setTreeKey(item.children, item.key)
    }
    return item
  }) 
}

const generateList = data => {
  const arr = [];
  const _fn = data => {
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      const { key, label} = node;
      arr.push({ key, title: key, label: label});
      if (node.children) {
        _fn(node.children);
      }
    }
  }
  _fn(data);
  return arr
}

class pageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataList: [],
      dataListArr: [],
      expandedKeys: [], // 搜索到的指定值  __展开指定的树节点
      searchValue: '', 
      autoExpandParent: true, // __是否自动展开父节点
    }
  }

  

  componentDidMount () {
    SelectDictionary().then(res => {
      let data = res.data
      setTreeKey(data)

      const dataListArr = generateList(data);
      this.setState({
        dataList: data,
        dataListArr: dataListArr
      });
    })
  }

  renderDataInfo = () => {
    if(this.state.dataList) {
      return (
        <AntdEmpty></AntdEmpty>
      )
    } else {
      return (
        <div>内容列表</div>
      )
    }
  }

  // 展开/收起节点时触发
  onExpand = expandedKeys => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  };

  onChange = e => {
    const { value } = e.target;
    const { dataList, dataListArr } = this.state;

    const expandedKeys = dataListArr
      .map(item => {
        if (item.label.indexOf(value) > -1) {
          return getParentKey(item.key, dataList);
        }
        return null;
      })
      .filter((item, i, self) => item && self.indexOf(item) === i);
       
    this.setState({
      expandedKeys,
      searchValue: value,
      autoExpandParent: true,
    });
  };

  setbut (data) {
    return (
      data.depth === '1' 
      ? <Button type="link">增加值</Button> 
      : <Button type="link">编辑</Button>
    )
  }

  loop = data => {
    return data.map(item => {
      const searchValue = this.state.searchValue;
      const index = item.label.indexOf(searchValue);
      const beforeStr = item.label.substr(0, index);
      const afterStr = item.label.substr(index + searchValue.length);
      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span style={{ color: '#f50' }}>{searchValue}</span>
            {afterStr}
            {this.setbut(item)}
          </span>
        ) : (
          <span>{item.label} {this.setbut(item)}</span> 
        );

      if (item.children) {
        return (
          <TreeNode key={item.key} title={title}>
            {this.loop(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} title={title} />;
    })
  }

  render() {
    const { expandedKeys, autoExpandParent } = this.state;
   
    return (
      <Content style={{ margin: '0 16px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>系统管理</Breadcrumb.Item>
          <Breadcrumb.Item>字典管理</Breadcrumb.Item>
        </Breadcrumb>
        <div className="tabel-base-wrap">
          <Search 
            style={{ marginBottom: 8 }} 
            placeholder="输入关键字进行过滤" 
            onChange={this.onChange} />
          <Tree
            className={styles.treeWrap}
            onExpand={this.onExpand}
            blockNode={true}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
          >
            {this.loop(this.state.dataList)}
          </Tree>
        </div>
      </Content>
    );
  }

}


export default pageList;

