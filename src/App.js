import React,{Component} from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Tables from './Tables';

class App extends Component{
    render(){
        return(
            <Provider store={store}>
                <Tables />
            </Provider>
        )
    }

}

export default App;