import React, { Component } from 'react';
import ArticleList from './components/ArticleList';

export default class Newslist extends Component {
  static displayName = 'Newslist';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="newslist-page">
        <ArticleList />
      </div>
    );
  }
}
