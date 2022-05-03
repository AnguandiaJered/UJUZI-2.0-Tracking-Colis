import { combineReducers } from 'redux';
import {clientReducers,agentReducers,colisReducers,destinationReducers,expeditionReducers,localisationReducers,paiementReducers,usersReducers,mailReducers} from './dataReducers';

export default combineReducers({
    clientReducers,
    agentReducers,
    colisReducers,
    destinationReducers,
    expeditionReducers,
    localisationReducers,
    paiementReducers,
    usersReducers,
    mailReducers
});

