import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App/App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'mobx-react';
import FlatStore from './store/FlatStore';
import BookStore from './store/BookStore';
import ModalStore from './store/ModalStore';

const store = {FlatStore, BookStore, ModalStore }
const Root = (
    <Provider {...store}>
        <App />
    </Provider>
);

ReactDOM.render(Root, document.getElementById('root'));
registerServiceWorker();

