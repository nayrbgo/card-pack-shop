// CARD PACK SHOP - COLLECTION

function addCardToCollection(rarity: string, characterName: string, value: number, openingValue: number) {
    collectionSets.push(setName)
    collectionRarities.push(rarity)
    collectionCharacters.push(characterName)
    collectionValues.push(value)
    collectionOpenValues.push(openingValue)
}

function sellSelectedCard() {
    if (collectionSets.length == 0) {
        game.splash("NO CARDS TO SELL")
        return
    }

    let soldRarity = collectionRarities[selectedCard]
    let soldCharacter = collectionCharacters[selectedCard]
    let saleValue = getSaleValue(selectedCard)

    busy = true
    let confirmed = game.ask(
        "SELL " + shortCharacter(soldCharacter) + "?",
        shortRarity(soldRarity) + "  $" + saleValue
    )
    busy = false

    if (!confirmed) {
        game.splash("SALE CANCELLED", "Card kept")
        return
    }

    money += saleValue
    collectionSets.removeAt(selectedCard)
    collectionRarities.removeAt(selectedCard)
    collectionCharacters.removeAt(selectedCard)
    collectionValues.removeAt(selectedCard)
    collectionOpenValues.removeAt(selectedCard)

    if (selectedCard >= collectionSets.length) selectedCard = collectionSets.length - 1
    if (selectedCard < 0) selectedCard = 0

    game.splash("SOLD!", soldCharacter + " +$" + saleValue)
}
