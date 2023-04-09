

export default function validateDocument(docNumber){
    
    if(typeof +docNumber === 'number' && (docNumber.length > 0 || docNumber.length < 8)){

        return true;
    }else{
        
        return false;
    }
}