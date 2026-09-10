// CARD PACK SHOP - MARKET SYSTEM
// Market values are percentages. 100 = 1.00x.

function updateMarket() {
    normalMarket = randint(70, 130)
    holographMarket = randint(70, 140)
    exMarket = randint(65, 150)
    illustrationMarket = randint(60, 170)
    ultraMarket = randint(55, 190)
    sirMarket = randint(50, 220)
    mhrMarket = randint(40, 250)
}

function getMarketPercent(rarity: string): number {
    if (rarity == "NORMAL") return normalMarket
    if (rarity == "HOLOGRAPH") return holographMarket
    if (rarity == "EX") return exMarket
    if (rarity == "ILLUSTRATION RARE") return illustrationMarket
    if (rarity == "ULTRA RARE") return ultraMarket
    if (rarity == "SPECIAL ILLUSTRATION") return sirMarket
    if (rarity == "MEGA HYPER RARE") return mhrMarket
    return 100
}

function getSaleValue(index: number): number {
    let baseValue = collectionValues[index]
    let marketPercent = getMarketPercent(collectionRarities[index])
    return Math.max(1, Math.idiv(baseValue * marketPercent, 100))
}

function getOpeningSaleValue(rarity: string, baseValue: number): number {
    let marketPercent = getMarketPercent(rarity)
    return Math.max(1, Math.idiv(baseValue * marketPercent, 100))
}

function getCollectionMarketValue(): number {
    let total = 0
    for (let i = 0; i < collectionValues.length; i++) {
        total += getSaleValue(i)
    }
    return total
}

function drawMarket() {
    screen.fill(1)
    screen.print("CARD MARKET", 42, 5, 7, image.font8)
    screen.drawLine(5, 18, 154, 18, 7)
    screen.print("TYPE", 8, 23, 7, image.font5)
    screen.print("MARKET", 108, 23, 7, image.font5)

    drawMarketRow("NORMAL", normalMarket, 34)
    drawMarketRow("HOLOGRAPH", holographMarket, 46)
    drawMarketRow("EX", exMarket, 58)
    drawMarketRow("ILLUST", illustrationMarket, 70)
    drawMarketRow("ULTRA", ultraMarket, 82)
    drawMarketRow("SIR", sirMarket, 94)
    drawMarketRow("MHR", mhrMarket, 106)

    screen.print("MENU OR A = BACK", 42, 117, 7, image.font5)
}

function drawMarketRow(label: string, percent: number, y: number) {
    screen.print(label, 8, y, 7, image.font5)
    screen.print("" + percent + "%", 112, y, 7, image.font5)
}
