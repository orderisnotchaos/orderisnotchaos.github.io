
export default function validateBusinessName(businessName){

    if(businessName !== '' && businessName !== null &&businessName !== undefined){
        return true;
    }

    return false;
}