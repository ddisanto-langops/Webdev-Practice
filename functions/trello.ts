async function getActiveCards(since?: string): Promise<RawTrelloCard[]> {
    /**
     * Fetches all cards on the board (specified by Trello Board ID)
     * where the card is not archived (i.e. dateClosed property is null).
     * @param since Optional parmaeter to fetch cards starting at a certain date. 
     * If no date is specified, cards from only the last 24 hours are fetched.
    */
    
    const date = new Date();
    date.setDate(date.getDate() -1)
    const yesterday = date.toISOString().split('T')[0]

    try {
        const response = await fetch(
            `https://api.trello.com/1/boards/${this.trelloBoardId}/cards?key=${this.trelloKey}&token=${this.trelloToken}&fields=all&attachments=true&attachment_fields=all&customFieldItems=true&actions=all&since=${since ?? yesterday}`,
            { method: 'GET' }
        )
        if (!response.ok) {
            throw new Error(`Trello API error: ${response.statusText}`)
        }
        const cards: RawTrelloCard[] = await response.json() as RawTrelloCard[]
        
        return cards
        
    } catch (error) {
        error instanceof Error ? console.log(`Get Active Cards: ${error.message}`) : 
            console.log("Get Active Cards: Unkown error")
        return []
    }
}


async function getArchivedCards(since?: string): Promise<RawTrelloCard[]> {
        
    const date = new Date();
    date.setDate(date.getDate() -1)
    const yesterday = date.toISOString().split('T')[0]

    try {
        const response = await fetch(
            `https://api.trello.com/1/boards/${this.trelloBoardId}/cards?key=${this.trelloKey}&token=${this.trelloToken}&filter=closed&fields=name,idLabels,labels,due,dateLastActivity,url,isTemplate&attachments=true&attachment_fields=name,url&customFieldItems=true&actions=all&since=${since ?? yesterday}`,
            { method: 'GET' }
        )
        if (!response.ok) {
            throw new Error(`Trello API error: ${response.statusText}`)
        }
        const cards: RawTrelloCard[] = await response.json() as RawTrelloCard[]
        return cards

    } catch (error) {
        error instanceof Error ? console.log(`Get Arhived Cards: ${error.message}`) :
            console.log("Get Archived Cards: Unknown  error")
        return []
    }
}
