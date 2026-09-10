// CARD PACK SHOP - UI

function drawHome() {
    screen.fill(9)
    screen.print("CARD PACK SHOP", 34, 7, 1, image.font8)
    screen.drawLine(8, 20, 151, 20, 1)
    screen.print(setName, 10, 28, 1, image.font5)
    screen.print("PACK PRICE", 10, 42, 1, image.font5)
    screen.print("$" + packPrice, 112, 42, 1, image.font5)
    screen.print("CASH", 10, 52, 1, image.font5)
    screen.print("$" + money, 112, 52, 1, image.font5)
    screen.print("PACKS OPENED", 10, 62, 1, image.font5)
    screen.print("" + packs, 112, 62, 1, image.font5)
    screen.print("CARDS OWNED", 10, 72, 1, image.font5)
    screen.print("" + collectionSets.length, 112, 72, 1, image.font5)
    screen.print("MARKET VALUE", 10, 82, 1, image.font5)
    screen.print("$" + getCollectionMarketValue(), 112, 82, 1, image.font5)
    screen.drawLine(8, 94, 151, 94, 1)
    screen.print("A  OPEN PACK", 10, 99, 1, image.font5)
    screen.print("B  COLLECTION", 10, 107, 1, image.font5)
    screen.print("< > CHANGE SET", 10, 115, 1, image.font5)
}

function drawCollection() {
    screen.fill(1)
    screen.print("MY COLLECTION", 36, 4, 7, image.font8)
    screen.print("CARDS " + collectionSets.length + "  VALUE $" + getCollectionMarketValue(), 6, 17, 7, image.font5)
    screen.drawLine(5, 26, 154, 26, 7)

    if (collectionSets.length == 0) {
        screen.print("NO CARDS YET", 45, 53, 7, image.font5)
        screen.print("OPEN SOME PACKS", 35, 65, 7, image.font5)
        screen.print("B = BACK", 52, 105, 7, image.font5)
        return
    }

    if (selectedCard < 0) selectedCard = 0
    if (selectedCard >= collectionSets.length) selectedCard = collectionSets.length - 1

    let cardsPerPage = 5
    let page = Math.idiv(selectedCard, cardsPerPage)
    let start = page * cardsPerPage
    let end = start + cardsPerPage
    if (end > collectionSets.length) end = collectionSets.length

    let y = 31
    for (let i = start; i < end; i++) {
        let rowColor = 7
        if (i == selectedCard) rowColor = 2

        screen.print((i + 1) + "." + shortSetName(collectionSets[i]), 4, y, rowColor, image.font5)
        screen.print(shortRarity(collectionRarities[i]), 37, y, rowColor, image.font5)
        screen.print("$" + getSaleValue(i), 126, y, rowColor, image.font5)
        y += 11
    }

    screen.drawLine(5, 87, 154, 87, 7)
    screen.print(shortCharacter(collectionCharacters[selectedCard]), 5, 91, 7, image.font5)
    screen.print(shortRarity(collectionRarities[selectedCard]), 5, 99, 7, image.font5)
    screen.print("NOW $" + getSaleValue(selectedCard), 5, 107, 7, image.font5)

    let portrait = getCharacterPortrait(setIndexFromName(collectionSets[selectedCard]), collectionRarities[selectedCard])
    screen.drawTransparentImage(portrait, 132, 91)

    let maxPage = Math.idiv(collectionSets.length - 1, cardsPerPage)
    screen.print("P" + (page + 1) + "/" + (maxPage + 1) + " A=SELL B=BACK", 65, 116, 7, image.font5)
}

function shortSetName(name: string): string {
    if (name == "ASCENDED HEROES") return "AH"
    if (name == "CHAOS RISING") return "CR"
    if (name == "PERFECT ORDER") return "PO"
    return "PB"
}

function setIndexFromName(name: string): number {
    if (name == "ASCENDED HEROES") return 0
    if (name == "CHAOS RISING") return 1
    if (name == "PERFECT ORDER") return 2
    return 3
}

function shortRarity(rarity: string): string {
    if (rarity == "NORMAL") return "NORMAL"
    if (rarity == "HOLOGRAPH") return "HOLO"
    if (rarity == "EX") return "EX"
    if (rarity == "ILLUSTRATION RARE") return "ILLUST"
    if (rarity == "ULTRA RARE") return "ULTRA"
    if (rarity == "SPECIAL ILLUSTRATION") return "SIR"
    if (rarity == "MEGA HYPER RARE") return "MHR"
    return rarity
}

function shortCharacter(name: string): string {
    if (name.length <= 19) return name
    return name.substr(0, 19)
}
