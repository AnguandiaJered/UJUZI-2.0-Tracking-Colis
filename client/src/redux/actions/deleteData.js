import axios from 'axios';

export const DELETE_AGENTS = "DELETE_AGENTS";
export const DELETE_CLIENTS = "DELETE_CLIENTS";
export const DELETE_COLIS = "DELETE_COLIS";
export const DELETE_DESTINATION = "DELETE_DESTINATION";
export const DELETE_EXPEDITION = "DELETE_EXPEDITION";
export const DELETE_LOCALISATION = "DELETE_LOCALISATION";
export const DELETE_PAIEMENT = "DELETE_PAIEMENT";
export const DELETE_USERS = "DELETE_USERS";

export const deleteAgents = (agentId) => {
    return (dispatch) => {
        return axios({
            method: "delete",
            url: `http://localhost:8000/agent/${agentId.id}`,    
        }).then(res => {
            dispatch({ type: DELETE_AGENTS, payload: {agentId} });
        }).catch((err) => console.log(err));
    }
}


export const deleteClients = (clientId) => {
    return (dispatch) => {
        return axios({
            method: "delete",
            url: `http://localhost:8000/client/${clientId.id}`,    
        }).then((res) => {
            dispatch({ type: DELETE_CLIENTS, payload: {clientId} });
        }).catch((err) => console.log(err));
    }
}

export const deleteColis = (colisId) => {
    return (dispatch) => {
        return axios({
            method: "delete",
            url: `http://localhost:8000/colis/${colisId.id}`,    
        }).then((res) => {
            dispatch({ type: DELETE_COLIS, payload: {colisId} });
        }).catch((err) => console.log(err));
    }
}

export const deleteDestination = (destinationId) => {
    return (dispatch) => {
        return axios({
            method: "delete",
            url: `http://localhost:8000/destination/${destinationId.id}`,    
        }).then((res) => {
            dispatch({ type: DELETE_DESTINATION, payload: {destinationId} });
        }).catch((err) => console.log(err));
    }
}

export const deleteExpedition = (expeditionId) => {
    return (dispatch) => {
        return axios({
            method: "delete",
            url: `http://localhost:8000/expedition/${expeditionId.id}`,    
        }).then((res) => {
            dispatch({ type: DELETE_EXPEDITION, payload: {expeditionId} });
        }).catch((err) => console.log(err));
    }
}

export const deleteLocalisation = (localisationId) => {
    return (dispatch) => {
        return axios({
            method: "delete",
            url: `http://localhost:8000/localisation/${localisationId.id}`,    
        }).then((res) => {
            dispatch({ type: DELETE_LOCALISATION, payload: {localisationId} });
        }).catch((err) => console.log(err));
    }
}

export const deletePaiement = (paiementId) => {
    return (dispatch) => {
        return axios({
            method: "delete",
            url: `http://localhost:8000/paiement/${paiementId.id}`,    
        }).then((res) => {
            dispatch({ type: DELETE_PAIEMENT, payload: {paiementId} });
        }).catch((err) => console.log(err));
    }
}

export const deleteUsers = (usersId) => {
    return (dispatch) => {
        return axios({
            method: "delete",
            url: `http://localhost:8000/users/${usersId.id}`,    
        }).then((res) => {
            dispatch({ type: DELETE_USERS, payload: {usersId} });
        }).catch((err) => console.log(err));
    }
}
