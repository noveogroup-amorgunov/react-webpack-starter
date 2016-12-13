import React        from 'react';
import ReactDOM     from 'react-dom';
import $            from 'jquery';

const Company = React.createClass({
    render() {
        const title = this.props.data.text;
        const image = this.props.data.logo_url  || '';
        const url = this.props.data.url || '#';
        const area = this.props.data.area || 'Россия';

        return (
            <div className="company">
                <img src={"https://hh.ru/" + image} />
                <div>
                    <span>{area},</span> {title} 
                    <br />
                    <a href="url">{url}</a>
                </div>
            </div>
        )
    }
});

const CompanyList = React.createClass({
    render() {
        const data = this.props.data;
        console.log(data);

        return (
            <div className="company-list">
                {data.map((item, index) => 
                    <div key={index}>
                        <Company data={item} />
                    </div>
                )}
            </div>
        );
    }
});


const SearchInput = React.createClass({
    componentDidMount() {
        ReactDOM.findDOMNode(this.refs.name).focus();
    },
    onChange(e) {
        e.preventDefault();

        var nameEl = ReactDOM.findDOMNode(this.refs.name).value.trim();
        this.props.onChange(nameEl);
    },
    render() {
        return (
            <form className=''>
                <input
                    type='text'
                    defaultValue=''
                    placeholder='Введите имя компании'
                    ref='name'
                    onChange={this.onChange}
                />
            </form>
        );
    }
});

const App = React.createClass({
    getInitialState() {
      return {
        companies: []
      };
    },
    onChange(name) {
        console.info(name);
        const url = this.props.source.replace('{{value}}', encodeURIComponent(name));

        $.get(url, (result) => {
            this.setState({
                companies: result
            });
        });
    },
    render() {
        return (
            <div className="app">
                <SearchInput onChange={this.onChange} />
                <CompanyList data={this.state.companies} />
            </div>
        );
    }
});

ReactDOM.render(
  <App source="http://127.0.0.1:3000/api/?q={{value}}" />,
  document.getElementById('app')
);
