const { render, Component } = require('inferno');
const { createElement } = require('inferno-create-element');
const { ipcRenderer } = require('electron');

class MyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: []
        };
    }
    componentDidMount(){
        let history = this.state.message;
        ipcRenderer.send(this.props.ch, 'ping');
        ipcRenderer.on(this.props.ch, (e, arg)=>{
            history.push( arg );
            let length = this.props.N;
            if( history.length > length ){
                history.splice( 0, history.length - length );
            }
            this.setState({ message: history });
        });
    }
    render(){
        let message = this.state.message;
        return createElement('div', {className: this.props.M }, message.map( i => {
            return createElement('div', {className: this.props.C}, i );
        }));                      
    }
}

var cLogs = (ipcChanalName, divID, CssClassName, subClassName, numOfLinelog) => {
    render(createElement( MyComponent, { ch: ipcChanalName, M: CssClassName, C: subClassName , N: numOfLinelog },), document.getElementById( divID ));
};

module.exports.console_log = cLogs;