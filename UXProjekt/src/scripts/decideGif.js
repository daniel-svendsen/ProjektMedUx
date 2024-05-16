// decideGif.js
import halvklart from '@/assets/Väder/halvklart.gif';
import soligt from '@/assets/Väder/soligt.gif';
import regn from '@/assets/Väder/regn.gif';
// import åska from '@/assets/Väder/åska.gif';
import vind from '@/assets/Väder/vind.gif';

export function decideGif(weatherSymbol){
    if(weatherSymbol >=1 && weatherSymbol <=2){
        return soligt;
    } else if(weatherSymbol >=3 && weatherSymbol <=4){
        return halvklart;
     } else if(weatherSymbol >=5 && weatherSymbol <=6){
         return vind;
    } else if(weatherSymbol >=8 && weatherSymbol <=10 || weatherSymbol === 19 || weatherSymbol === 20){
        return regn;
    } else {
        return ""; // Return empty string if no matching weather symbol
    }
}
    