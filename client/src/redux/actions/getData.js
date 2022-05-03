import axios from 'axios';

export const GET_AGENTS = "GET_AGENTS";
export const GET_CLIENTS = "GET_CLIENTS";
export const GET_COLIS = "GET_COLIS";
export const GET_DESTINATION = "GET_DESTINATION";
export const GET_EXPEDITION = "GET_EXPEDITION";
export const GET_LOCALISATION = "GET_LOCALISATION";
export const GET_PAIEMENT = "GET_PAIEMENT";
export const GET_USERS = "GET_USERS";


export const getAgents = () => {
    return (dispatch) => {
        return axios.get('http://localhost:8000/agent/all').then(res => {
            dispatch({
                type: GET_AGENTS,
                payload: res.data
            });
        }).catch((err) => console.log(err));
    }
}

export const getClients = () => {
    return (dispatch) => {
        return axios.get('http://localhost:8000/client/all').then(res => {
            dispatch({
                type: GET_CLIENTS,
                payload: res.data
            });
        }).catch((err) => console.log(err));
    }
}

export const getColis = () => {
    return (dispatch) => {
        return axios.get('http://localhost:8000/colis/all').then(res => {
            dispatch({
                type: GET_COLIS,
                payload: res.data
            });
        }).catch((err) => console.log(err));
    }
}

export const getDestination = () => {
    return (dispatch) => {
        return axios.get('http://localhost:8000/destination/all').then(res => {
            dispatch({
                type: GET_DESTINATION,
                payload: res.data
            });
        }).catch((err) => console.log(err));
    }
}

export const getExpedition = () => {
    return (dispatch) => {
        return axios.get('http://localhost:8000/expedition/all').then(res => {
            dispatch({
                type: GET_EXPEDITION,
                payload: res.data
            });
        }).catch((err) => console.log(err));
    }
}

export const getLocalisation = () => {
    return (dispatch) => {
        return axios.get('http://localhost:8000/localisation/all').then(res => {
            dispatch({
                type: GET_LOCALISATION,
                payload: res.data
            });
        }).catch((err) => console.log(err));
    }
}

export const getPaiement = () => {
    return (dispatch) => {
        return axios.get('http://localhost:8000/paiement/all').then(res => {
            dispatch({
                type: GET_PAIEMENT,
                payload: res.data
            });
        }).catch((err) => console.log(err));
    }
}

export const getUsers = () => {
    return (dispatch) => {
        return axios.get('http://localhost:8000/users/all').then(res => {
            dispatch({
                type: GET_USERS,
                payload: res.data
            });
        }).catch((err) => console.log(err));
    }
}


