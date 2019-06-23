import React from 'react';
import './App.css';
import GifItem from './components/GifItem'
import SearchBar from "./components/searchBar";

class App extends React.Component {

    constructor(props){
        super(props);
        this.onResults = this.onResults.bind(this);
        this.state = { gifItemsList:[]}
    }

    onResults(items){
        let newArray = [];
        //console.log("onResults | items",items.data);
        if(items && items.data && items.data.data && items.data.data.length){
            items.data.data.forEach(item => { newArray.push({id:item.id,gifUrl:item.images.preview_gif.url,stillUrl:item.images.preview.url}); });

            this.setState({gifItemsList:newArray})
        }
    }

    render() {
        let gifDomList =
            this.state.gifItemsList.map(item =>
                <GifItem key={item.id} gif={item.gifUrl} still={item.stillUrl}></GifItem>);

       // console.log("gifDomList ",gifDomList);
        return (

            <div className="App">
              <div><h1> GIF SEARCH </h1></div>
              <SearchBar onSearchResult={this.onResults}/>
              <div className="gifItemList">
                  {gifDomList}
              </div>
            </div>
        );
    }
}


export default App;
