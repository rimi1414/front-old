const axios = require('axios').default;

export default {
    get: options =>{
        return axios.get(`http://localhost:4000/${options.entity}`)
            .then(response => {
                // handle success
                console.log(response);
                return response.data.result
            })
            .catch (error => {
                // handle error
                console.error(error);
            })
    },
        post: options =>{
        axios.post(`http://localhost:4000/${options.table}`,
            options.editTable)
            .then( response => {
                console.log(response);
            })
            .catch( error => {
                console.log(error);
            });
    },
    delete: options =>{
        return axios.delete(`http://localhost:4000/${options.entity}/${options.entityId}`)
            .then( (response) => {
                console.log(response);
            })
            .catch( error => {
                console.log(error);
            });
    },
    update: options =>{
        axios.put(`http://localhost:4000/${options.entity}/${options.entityId}`, options.newProfile)
            .then( (response) => {
                console.log(response);
            })
            .catch( error => {
                console.log(error);
            });
    },
    getBytId: options =>{
        return axios.get(`http://localhost:4000/${options.entity}/${options.entityId}`)
            .then(response => {
                // handle success
                console.log(response);
                return response.data.result
            })
            .catch (error => {
                // handle error
                console.error(error);
            })
    },
}