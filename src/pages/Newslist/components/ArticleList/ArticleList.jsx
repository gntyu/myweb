import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Icon } from '@alifd/next';
import DataBinder from '@icedesign/data-binder';


const generatorData = () => {
  return Array.from({ length: 5 }).map(() => {
    return {
      title: '越夏越嗨皮-7月官方营销活动-技能提升方向',
      description:
        '商家通过V任务选择主播并达成合作，费用按照商品链接计算，一个商品为一个价格，建议主播在一场直播里最多接60个商品，并提供不少于两个小时的直播服务，每个商品讲解时间不少于5分钟。',
      tags: ['直播', '大促活动', '讲解'],
      like: 123,
      favor: 245,
      comment: 546,
    };
  });
};

@DataBinder({
  'getlist': {
    url: '/lyapi/getlist',
    method: 'get',
    data: { },
    defaultBindingData: {
      lists:[]
    }
  }
})
export default class ArticleList extends Component {
  static displayName = 'ArticleList';

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount(){
    this.props.updateBindingData('getlist');
  }

  render() {
    // const lists = generatorData();
    const { lists } = this.props.bindingData.getlist;
    console.log('lists',lists);
    return (
      <div className="article-list">
        <IceContainer style={styles.articleFilterCard}>
          <ul className="article-sort" style={styles.articleSort}>
            <li style={styles.sortItem}>
              最新 <Icon type="arrow-down" size="xs" />
            </li>
            <li style={styles.sortItem}>
              最热 <Icon type="arrow-down" size="xs" />
            </li>
            <li style={styles.sortItem}>
              距离截稿日期最近 <Icon type="arrow-down" size="xs" />
            </li>
            <li style={styles.sortItem}>
              距离开始开启最近 <Icon type="arrow-down" size="xs" />
            </li>
          </ul>
        </IceContainer>
        <IceContainer>
          {lists.map((item, index) => {
            return (
              <div key={index} style={styles.articleItem}>
                <div>
                  <a style={styles.title} href="/">
                    {item.title}
                  </a>
                </div>
                <div>
                  <p style={styles.desc}>{item.desc}</p>
                </div>
                <div style={styles.articleItemFooter}>
                  <div style={styles.articleItemTags}>
                      <span
                          className="article-item-tag"
                          style={styles.tag}
                        >
                        {item.cate}
                      </span>
                      {item.source&&<span
                          className="article-item-tag"
                          style={styles.tag}
                        >
                        {item.source}
                      </span>}
                    {/* {item.tags.map((tag, idx) => {
                      return (
                        <span
                          key={idx}
                          className="article-item-tag"
                          style={styles.tag}
                        >
                          {tag}
                        </span>
                      );
                    })} */}
                  </div>
                  <div style={styles.articleItemMeta}>
                    <span style={styles.itemMetaIcon}>
                      <Icon type="good" size="small" /> 
                    </span>
                    <span style={styles.itemMetaIcon}>
                      <Icon type="favorite" size="small" /> 
                    </span>
                    <span style={styles.itemMetaIcon}>
                      <Icon type="comments" size="small" /> 
                    </span>
                    <span style={styles.itemMetaIcon}>
                      {item.date}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </IceContainer>
      </div>
    );
  }
}

const styles = {
  articleFilterCard: {
    marginBottom: '10px',
    minHeight: 'auto',
    padding: 0,
  },
  articleSort: {
    margin: 0,
    padding: 0,
  },
  sortItem: {
    cursor: 'pointer',
    listStyle: 'none',
    fontSize: '14px',
    float: 'left',
    whiteSpace: 'nowrap',
    padding: '20px',
  },
  articleItem: {
    marginBottom: '30px',
    paddingBottom: '20px',
    borderBottom: '1px solid #f5f5f5',
  },
  title: {
    fontSize: '16px',
    color: '#333',
    textDecoration: 'none',
  },
  desc: {
    lineHeight: '24px',
    fontSize: '14px',
    color: '#999',
  },
  articleItemFooter: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tag: {
    fontSize: '13px',
    background: '#f5f5f5',
    color: '#999',
    padding: '4px 15px',
    borderRadius: '20px',
    marginRight: '20px',
  },
  articleItemTags: {
    padding: '10px 0',
  },
  articleItemMeta: {
    padding: '10px 0',
  },
  itemMetaIcon: {
    fontSize: '14px',
    color: '#999',
    marginRight: '15px',
  },
};
