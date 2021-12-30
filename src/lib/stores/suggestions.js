import {writable, get} from 'svelte/store';

const suggestionsStore = writable([])

const customSuggestionsStore = {
    subscribe: suggestionsStore.subscribe,

    addSuggestion: (suggestionData, docID) => {
        suggestionsStore.update(store => {
            let tempStore = [...store]
            tempStore = [...tempStore, {
                ...suggestionData, id: docID
            }]
            return tempStore
        })
    },

    setSuggestionsOnLoad: (suggestions) => {
        suggestionsStore.set(suggestions)
        // console.log(get(suggestionsStore))
    },

    returnStore: () => {
        const exportSuggestionStore = get(suggestionsStore)
        return exportSuggestionStore
    }
}

export default customSuggestionsStore