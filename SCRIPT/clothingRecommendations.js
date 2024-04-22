export function getClothingRecommendation(symbolCode, temperature) {
    let clothingRecommendation = '';

    if (symbolCode >= 1 && symbolCode <= 7) {
        if (temperature > 25) {
            clothingRecommendation = 'Bär lätta kläder och solskydd.';
        } else if (temperature < 10) {
            clothingRecommendation = 'Bär varma kläder som jacka, halsduk och handskar.';
        } else {
            clothingRecommendation = 'Använd kläder för skiftande väder.';
        }
    } else if (symbolCode >= 8 && symbolCode <= 27) {
        if (temperature > 15) {
            clothingRecommendation = 'Bär regnkläder och ta med paraply.';
        } else {
            clothingRecommendation = 'Bär varma kläder och regnkläder.';
        }
    }

    return clothingRecommendation;
}