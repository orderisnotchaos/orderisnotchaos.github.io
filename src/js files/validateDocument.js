

export default function validateDocument(document){
    if(document.isNumber() && (document.length > 0 || document.length < 8)){

        return true;
    }else{
        
        return false;
    }
}