import axios from 'axios';


export default {

    // getUser: function() {
    //     return axios.get('/api/users')
    // },


    //gets called when user clicks login. should return token.
    

    // getUser: function(id) {
    //     return axios.get('/api/users/me', {
    // },

   


    // deleteUser: function(id) {
    //     return axios.delete('/api/users/' + id)
    // },

    saveUser: function(userData) {
        return axios.post('/api/users', userData)
    },



    getTab: function() {
        return axios.get('/api/tabs')
    },

    // getTab: function(id) {
    //     return axios.get(    '/api/tabs' + id)
    // },

    // deleteTab: function(id) {
    //     return axios.delete('/api/tabs/' + id)
    // },

    // saveTab: function(userData) {
    //     return axios.put('/api/tabs', userData)
    // },



    // getPost: function() {
    //     return axios.get('/api/posts')
    // },

    // getPost: function(id) {
    //     return axios.get('/api/posts' + id)
    // },

    // deletePost: function(id) {
    //     return axios.delete('/api/posts/' + id)
    // },

    // savePosts: function(userData) {
    //     return axios.put('/api/posts', userData)
    // },

}