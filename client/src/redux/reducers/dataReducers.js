import { GET_AGENTS, GET_CLIENTS, GET_COLIS, GET_DESTINATION,GET_EXPEDITION,GET_LOCALISATION,GET_PAIEMENT,GET_USERS } from '../actions/getData';
import { ADD_AGENTS, ADD_CLIENTS, ADD_COLIS, ADD_DESTINATION,ADD_EMAIL,ADD_EXPEDITION,ADD_LOCALISATION,ADD_PAIEMENT,ADD_USERS } from '../actions/addData';
import { EDIT_AGENTS, EDIT_CLIENTS, EDIT_COLIS, EDIT_DESTINATION,EDIT_EXPEDITION,EDIT_LOCALISATION,EDIT_PAIEMENT,EDIT_USERS } from '../actions/editData';
import { DELETE_AGENTS, DELETE_CLIENTS, DELETE_COLIS, DELETE_DESTINATION,DELETE_EXPEDITION,DELETE_LOCALISATION,DELETE_PAIEMENT,DELETE_USERS } from '../actions/deleteData';
const initialState = {};

export const agentReducers = (state = initialState, action) => {
    switch(action.type){
        case GET_AGENTS:
            return action.payload;
        case ADD_AGENTS:
            return [action.payload, ...state];
        case EDIT_AGENTS:
            return state.map((agent) => {
                if(agent.id === action.payload.id){
                    return {
                        ...agent,
                        content: action.payload.content,
                    };
                } else return agent;
            });
        case DELETE_AGENTS:
            return state.filter((agent) => agent.id !== action.payload.agentId);
        default:
            return state;
    }
};

export const clientReducers = (state = initialState, action) => {
    switch(action.type){
        case GET_CLIENTS:
            return action.payload;
        case ADD_CLIENTS:
            return [action.payload, ...state];
        case EDIT_CLIENTS:
            return state.map((client) => {
                if(client.id === action.payload.id){
                    return {
                        ...client,
                        clients: action.payload.clients,
                    };
                } else return client;
            });
        case DELETE_CLIENTS:
            return state.filter((client) => client.id !== action.payload.clientId);
        default:
            return state;
    }
};

export const colisReducers = (state = initialState, action) => {
    switch(action.type){
        case GET_COLIS:
            return action.payload;
        case ADD_COLIS:
            return [action.payload, ...state];
        case EDIT_COLIS:
            return state.map((colis) => {
                if(colis.id === action.payload.id){
                    return {
                        ...colis,
                        content: action.payload.content,
                    };
                } else return colis;
            });
        case DELETE_COLIS:
            return state.filter((colis) => colis.id !== action.payload.colisId);
        default:
            return state;
    }
};

export const destinationReducers = (state = initialState, action) => {
    switch(action.type){
        case GET_DESTINATION:
            return action.payload;
        case ADD_DESTINATION:
            return [action.payload, ...state];
        case EDIT_DESTINATION:
            return state.map((destinations) => {
                if(destinations.id === action.payload.id){
                    return {
                        ...destinations,
                        destination: action.payload.destination,
                    };
                } else return destinations;
            });
        case DELETE_DESTINATION:
            return state.filter((destination) => destination.id !== action.payload.destinationId);
        default:
            return state;
    }
};

export const expeditionReducers = (state = initialState, action) => {
    switch(action.type){
        case GET_EXPEDITION:
            return action.payload;
        case ADD_EXPEDITION:
            return [action.payload, ...state];
        case EDIT_EXPEDITION:
            return state.map((expedition) => {
                if(expedition.id === action.payload.id){
                    return {
                        ...expedition,
                        content: action.payload.content,
                    };
                } else return expedition;
            });
        case DELETE_EXPEDITION:
            return state.filter((expedition) => expedition.id !== action.payload.expeditionId);
        default:
            return state;
    }
};

export const localisationReducers = (state = initialState, action) => {
    switch(action.type){
        case GET_LOCALISATION:
            return action.payload;
        case ADD_LOCALISATION:
            return [action.payload, ...state];
        case EDIT_LOCALISATION:
            return state.map((localisation) => {
                if(localisation.id === action.payload.id){
                    return {
                        ...localisation,
                        content: action.payload.content,
                    };
                } else return localisation;
            });
        case DELETE_LOCALISATION:
            return state.filter((localisation) => localisation.id !== action.payload.localisationId);
        default:
            return state;
    }
};

export const paiementReducers = (state = initialState, action) => {
    switch(action.type){
        case GET_PAIEMENT:
            return action.payload;
        case ADD_PAIEMENT:
            return [action.payload, ...state];
        case EDIT_PAIEMENT:
            return state.map((paiement) => {
                if(paiement.id === action.payload.id){
                    return {
                        ...paiement,
                        content: action.payload.content,
                    };
                } else return paiement;
            });
        case DELETE_PAIEMENT:
            return state.filter((paiement) => paiement.id !== action.payload.paiementId);
        default:
            return state;
    }
};

export const mailReducers = (state = initialState, action) => {
    switch(action.type){
        case ADD_EMAIL:
            return [action.payload, ...state];
        default:
            return state;
    }
};

export const usersReducers = (state = initialState, action) => {
    switch(action.type){
        case GET_USERS:
            return action.payload;
        case ADD_USERS:
            return [action.payload, ...state];
        case EDIT_USERS:
            return state.map((users) => {
                if(users.id === action.payload.id){
                    return {
                        ...users,
                        content: action.payload.content,
                    };
                } else return users;
            });
        case DELETE_USERS:
            return state.filter((users) => users.id !== action.payload.usersId);
        default:
            return state;
    }
};