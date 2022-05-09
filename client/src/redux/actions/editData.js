import axios from 'axios';

export const EDIT_AGENTS = "EDIT_AGENTS";
export const EDIT_CLIENTS = "EDIT_CLIENTS";
export const EDIT_COLIS = "EDIT_COLIS";
export const EDIT_DESTINATION = "EDIT_DESTINATION";
export const EDIT_EXPEDITION = "EDIT_EXPEDITION";
export const EDIT_LOCALISATION = "EDIT_LOCALISATION";
export const EDIT_PAIEMENT = "EDIT_PAIEMENT";
export const EDIT_USERS = "EDIT_USERS";


export const editAgents = (data) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `http://http://localhost:8000/agent/${data.id}`,
            data: {...data}
        }).then(res => {
            dispatch({ type: EDIT_AGENTS, payload: {...data} });
        }).catch((err) => console.log(err));
    }
}

export const editClients = (data) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `http://localhost:8000/client/${data.id}`,
            data: {...data}
        }).then(res => {
            dispatch({ type: EDIT_CLIENTS, payload: {...data} });
        }).catch((err) => console.log(err));
    }
}


export const editColis = (data) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `http://localhost:8000/colis/${data.id}`,
            data: {...data}
        }).then(res => {
            dispatch({ type: EDIT_COLIS, payload: {...data} });
        }).catch((err) => console.log(err));
    }
}

export const editDestination = (data) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `http://localhost:8000/destination/${data.id}`,
            data: {...data},
        }).then((res) => {
            dispatch({ type: EDIT_DESTINATION, payload: {...data} });
        }).catch((err) => console.log(err));
    }
}

export const editExpedition = (data) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `http://localhost:8000/expedition/${data.id}`,
            data: {...data}
        }).then(res => {
            dispatch({ type: EDIT_EXPEDITION, payload: {...data} });
        }).catch((err) => console.log(err));
    }
}

export const editLocalisation = (data) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `http://localhost:8000/localisation/${data.id}`,
            data: {...data}
        }).then(res => {
            dispatch({ type: EDIT_LOCALISATION, payload: {...data} });
        }).catch((err) => console.log(err));
    }
}

export const editPaiement = (data) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `http://localhost:8000/paiement/${data.id}`,
            data: {...data}
        }).then(res => {
            dispatch({ type: EDIT_PAIEMENT, payload: {...data} });
        }).catch((err) => console.log(err));
    }
}

export const editUsers = (data) => {
    return (dispatch) => {
        return axios({
            method: "put",
            url: `http://localhost:8000/users/${data.id}`,
            data: {...data}
        }).then(res => {
            dispatch({ type: EDIT_USERS, payload: {...data} });
        }).catch((err) => console.log(err));
    }
}