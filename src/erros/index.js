import store from '../store'
import router from '../router'
const validationFields = require('./errorCustom/1-fields');
const validationPermission = require('./errorCustom/9-permission');

export default (err) => {
    console.log(err);
    if(err.response.data.idError === validationPermission.idError){
        store.dispatch('addAlert', {
            type: validationPermission.type, icon: validationPermission.icon, message: validationPermission.message
        });
        router.push({path: '/admin'})
    }else if(err.response.data.idError === validationFields.idError){
        store.dispatch('addAlert', {
            type: validationFields.type, icon: validationFields.icon, message: validationFields.message
        });
    } else {
        store.dispatch('addAlert', {
            type:"error", icon:"mdi-alert", message:"Erro interno, contate o suporte!"
        });
    }

}
