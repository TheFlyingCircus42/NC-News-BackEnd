  const inputArray = [{ name: "Bob" , pet : "Otis" },
                        {name: "Jim" , pet : 'Quincey'}]

const propToKey = "name"
const propToVal = 'pet'

function createLookUpObject(inputArray , propToKey , propToVal) 
{
    const lookUpObj = {}

    for (let i = 0 ; i < inputArray.length ; i++)
        {
            const newKey = inputArray[i][propToKey];
            const newVal = inputArray[i][propToVal];
          
            lookUpObj[newKey] = newVal
        }   
    return lookUpObj;
}


module.exports = {createLookUpObject}