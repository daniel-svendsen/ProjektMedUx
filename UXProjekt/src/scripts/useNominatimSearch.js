// src/composables/useNominatimSearch.js
export async function useNominatimSearch(query) {
    const baseUrl = "https://nominatim.openstreetmap.org/search";
    const formatQuery = "format=json";

    try {
        const response = await fetch(`${baseUrl}?${formatQuery}&q=${encodeURIComponent(query)}`);
        const data = await response.json();
        if (data.length > 0) {
            // Returnera alla resultat istället för bara det första
            return { results: data, error: null };
        } else {
            return { results: [], error: "No results found" };
        }
    } catch (error) {
        console.error('Error searching location:', error);
        return { results: [], error: error.message };
    }
}
