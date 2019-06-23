import React from 'react';
import GifPlayer from 'react-gif-player';
export default class GifItem extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
          playing: true
        };
    }
//{/*<div className="gifItem">*/}
 //    {/*<img style={{width:"100%",height:"100%"}} src={this.props.gif}></img>*/}
 //    {/*<button*/}
 //              {/*style={{ fontSize: 30 }}*/}
 //              {/*disabled={!this.state.playing}*/}
 //              {/*onClick={() => this.pauseGif()}*/}
 //            {/*>*/}
 //              {/*{this.state.playing ? 'Pause GIF' : 'GIF Paused'}*/}
 //            {/*</button>*/}

    render() {
	    //console.log("this.props ",this.props);
        return (


            <GifPlayer
              gif={this.props.gif}
              still={this.props.still}
              pauseRef={pause => this.pauseGif = pause}
              onTogglePlay={playing => this.setState({ playing })}/>

        )
      }
}

