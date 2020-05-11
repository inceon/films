import React from 'react';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    fetch("https://api.github.com/gists/0625da34ba5ad971b984001392e31a53")
      .then(res => res.json())
      .then(
        (result) => {
          return result?.files?.films?.content?.split('\n')
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
      .then(
        (items) => {
          let parsedItems = items.map(item => item.split(';')).reduce((acc, item) => {
            if(item[1] === '1') {
              acc.watched.push(item);
            } else {
              acc.unwatched.push(item);
            }
            return acc;
          }, {
            watched: [],
            unwatched: []
          });
          this.setState({
            isLoaded: true,
            items: parsedItems
          });
        }
      );
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Помилка: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Завантаження...</div>;
    } else {
      console.log(items);
      return (
        <div className="App">
          <div className="header">
            <div className="logo">fs</div>
            <div className="navigation">
              <div className="tab">one</div>
              <div className="tab">two</div>
            </div>
          </div>
          <div className="items">
            <div className="not-watched">
              <div className="category-name">Not Watched</div>
              {items.unwatched.map(item => <div className="card">{item[0]}</div>)}
            </div>
            <div className="watched">
              <div className="category-name">Watched</div>
              {items.watched.map(item => <div className="card">{item[0]}</div>)}
            </div>
          </div>
        </div>
      );
    }
  }
}
