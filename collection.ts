// CARD PACK SHOP - COLLECTION

function addCardToCollection(rarity: string, characterName: string, value: number, openingValue: number) {
    collectionSets.push(setName)
    collectionRarities.push(rarity)
    collectionCharacters.push(characterName)
    collectionValues.push(value)
    collectionOpenValues.push(openingValue)
}

// Keep collection display helpers local to this file.
// This avoids MakeCode editor/compiler issues when resolving helpers across files.
function collectionRarityLabel(rarity: string): string {
    if (rarity == "NORMAL") return "NORMAL"
    if (rarity == "HOLOGRAPH") return "HOLO"
    if (rarity == "EX") return "EX"
    if (rarity == "ILLUSTRATION RARE") return "ILLUST"
    if (rarity == "ULTRA RARE") return "ULTRA"
    if (rarity == "SPECIAL ILLUSTRATION") return "SIR"
    if (rarity == "MEGA HYPER RARE") return "MHR"
    return rarity
}

function collectionCharacterLabel(name: string): string {
    if (name.length <= 19) return name
    return name.substr(0, 19)
}

function sellSelectedCard() {
    if (collectionSets.length == 0) {
        game.splash("NO CARDS TO SELL")
        return
    }

    let cardIndex = selectedCard
    let cardRarity = collectionRarities[cardIndex]
    let cardName = collectionCharacters[cardIndex]
    let saleValue = getSaleValue(cardIndex)

    busy = true
    let confirmed = game.ask(
        "SELL " + collectionCharacterLabel(cardName) + "?",
        collectionRarityLabel(cardRarity) + "  $" + saleValue
    )
    busy = false

    if (!confirmed) {
        game.splash("SALE CANCELLED", "Card kept")
        return
    }

    money += saleValue
    collectionSets.removeAt(cardIndex)
    collectionRarities.removeAt(cardIndex)
    collectionCharacters.removeAt(cardIndex)
    collectionValues.removeAt(cardIndex)
    collectionOpenValues.removeAt(cardIndex)

    if (selectedCard >= collectionSets.length) selectedCard = collectionSets.length - 1
    if (selectedCard < 0) selectedCard = 0

    game.splash("SOLD!", cardName + " +$" + saleValue)
}
