import React from 'react';
import NetworkUtils from '../util/networkUtils';

class SearchBar extends React.Component {
    constructor() {
        super();
        this.state = { inputValue: '' }
        this.searchKeyword = this.searchKeyword.bind(this);
    }

    searchKeyword(evt){
        evt.preventDefault();
        let that = this;
        NetworkUtils.getGifDetailsBasedOnKw(this.state.inputValue,0,10,function (resp) {
            that.props.onSearchResult(resp);
        });
    }

    onInputChange(inputValue) {
        this.setState({inputValue:inputValue
        });
    }

    render() {
        return (
            <div className="searchbar">
                <input style={{width:"50%",height:"100%",fontSize:"15pt"}} onChange={event => this.onInputChange(event.target.value)} />
                <button onClick={this.searchKeyword} style={{marginLeft:"10px"}}> Search </button>
            </div>
        );
    }
}

export default SearchBar;
