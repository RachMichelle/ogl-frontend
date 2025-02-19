import axios from 'axios';

const BASE_URL = "https://ogl-backend.onrender.com";

// API class for all api call methods

class OglApi {

    // get list of all of given type (staff, players, teams)
    // if error, returns undefined
    static async getAll(type) {
        try {
            let res = await axios.get(`${BASE_URL}/${type}`);
            return res.data[type];
        } catch (e) {
            return undefined;
        }
    };

    // get one of given type by their identifier (player alias, team code, staff username). 
    // type -> for url. subtype -> for result. 
    // ex: getting a player. URL would need /players (type) but results would be under res.data.player (subtype)
    // if error, returns undefined
    static async getOne(type, subType, identifier) {
        try {
            let res = await axios.get(`${BASE_URL}/${type}/${identifier}`);
            return res.data[subType];
        } catch (e) {
            return undefined;
        }
    };

    // add one of given type (staff, players, teams)
    // arguments type, subtype, data ( OBJECT: for data portion of axios request -> what is being added, token 
    // type => for url. subtype -> for result.
    // requires token for auth (header)
    // successful -> returns info object for added subject
    // if error, returns undefined

    static async add(type, subType, data, token) {
        try {
            let res = await axios.post(`${BASE_URL}/${type}`,
                data,
                { headers: { authorization: `bearer ${token}` } }
            );
            return res.data[subType];
        } catch (e) {
            return undefined;
        }
    };

    // update one of given type by their identifier
    // arguments type, subtype, identifier, data ( OBJECT: for data portion of axios request -> what is being updated), token 
    // type => for url. subtype -> for result.
    // requires token for auth (header)
    // successful -> returns info object for updated subject
    // if error, returns undefined

    static async update(type, subType, identifier, data, token) {
        try {
            let res = await axios.patch(`${BASE_URL}/${type}/${identifier}`,
                data,
                { headers: { authorization: `bearer ${token}` } }
            );
            return res.data[subType];
        } catch (e) {
            return undefined;
        }
    };

    // delete one of given type by their identifier
    // arguements type (ex: 'players'), identifier (ex: 'playerAlias'), token
    // requires token for auth (header)
    // successful -> returns true
    // error -> returns false

    static async delete(type, identifier, token) {
        try {
            await axios.delete(`${BASE_URL}/${type}/${identifier}`,
                { headers: { authorization: `bearer ${token}` } }
            )
            return true;
        } catch (e) {
            return false;
        }
    };

    /************* Player/Team association management */

    // update a player's active status for associated team
    // arguements: player alias, team code, isActive status AFTER change, token
    // requires token for auth (header)
    // successful -> returns true
    // error -> returns false
    static async manageActiveStatus(alias, code, isActive, token) {
        try {
            await axios.patch(`${BASE_URL}/players/teams/${alias}`,
                { code, isActive },
                { headers: { authorization: `bearer ${token}` } }
            );
            return true;
        } catch (e) {
            return false;
        }
    }

    // add team association for given player
    // arguements: player alias, team code, token
    // requires token for auth(header)
    // successful -> returns true
    // error -> returns false
    static async addTeamAssociation(alias, code, token) {
        try {
            await axios.post(`${BASE_URL}/players/teams/${alias}`,
                { code },
                { headers: { authorization: `bearer ${token}` } }
            )
            return true;
        } catch (e) {
            return false;
        }
    }

    /************* For Staff Only */

    // Authenticate user login info
    // if successful, returns user info object
    // if error, returns undefined
    static async authenticateUser(username, password) {
        try {
            let res = await axios.post(`${BASE_URL}/staff/login`, { username, password });
            return res.data.user;
        } catch (e) {
            return undefined;
        }
    };

    // update password
    // arguements: username, current password, new password, token
    // requires token for auth (header)
    // if successful -> return true
    // if error -> return false
    static async updatePassword(username, currentPassword, newPassword, token) {
        try {
            await axios.patch(`${BASE_URL}/staff/password/${username}`, { password: currentPassword, newPassword: newPassword },
                { headers: { authorization: `bearer ${token}` } }
            );
            return true;
        } catch (e) {
            return false;
        }
    };
};

export default OglApi;