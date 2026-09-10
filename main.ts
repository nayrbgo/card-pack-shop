let money = 100
let packs = 0
let setNumber = 0
let busy = false

let setName = "ASCENDED HEROES"
let packPrice = 10

// 0 = home
// 1 = collection
// 2 = marketplace
let screenMode = 0
let selectedCard = 0

// COLLECTION DATABASE
let collectionSets: string[] = []
let collectionRarities: string[] = []
let collectionCharacters: string[] = []
let collectionValues: number[] = []
let collectionOpenValues: number[] = []

// MARKET VALUES AS PERCENTAGES
// 100 = 1.00x, 125 = 1.25x, 80 = 0.80x
let normalMarket = 100
let holographMarket = 100
let exMarket = 100
let illustrationMarket = 100
let ultraMarket = 100
let sirMarket = 100
let mhrMarket = 100

scene.setBackgroundColor(9)
game.splash("CARD PACK SHOP", "DRAFT 1.7")
updateSet()
updateMarket()
showHome()

function updateSet() {
    if (setNumber == 0) {
        setName = "ASCENDED HEROES"
        packPrice = 10
    } else if (setNumber == 1) {
        setName = "CHAOS RISING"
        packPrice = 12
    } else if (setNumber == 2) {
        setName = "PERFECT ORDER"
        packPrice = 15
    } else {
        setName = "PITCH BLACK"
        packPrice = 18
    }
}

function showHome() {
    busy = false
    screenMode = 0
    updateSet()
}

game.onPaint(function () {
    if (screenMode == 0) {
        drawHome()
    } else if (screenMode == 1) {
        drawCollection()
    } else if (screenMode == 2) {
        drawMarket()
    }
})

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

controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (busy || screenMode != 0) {
        return
    }
    setNumber -= 1
    if (setNumber < 0) {
        setNumber = 3
    }
    updateSet()
})

controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (busy || screenMode != 0) {
        return
    }
    setNumber += 1
    if (setNumber > 3) {
        setNumber = 0
    }
    updateSet()
})

controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (busy) {
        return
    }
    if (screenMode == 1 && collectionSets.length > 0) {
        selectedCard -= 1
        if (selectedCard < 0) {
            selectedCard = 0
        }
    }
})

controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (busy) {
        return
    }
    if (screenMode == 1 && collectionSets.length > 0) {
        selectedCard += 1
        if (selectedCard >= collectionSets.length) {
            selectedCard = collectionSets.length - 1
        }
    }
})

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (busy) {
        return
    }
    if (screenMode == 1) {
        sellSelectedCard()
        return
    }
    if (screenMode == 2) {
        showHome()
        return
    }
    if (money < packPrice) {
        game.splash("NOT ENOUGH CASH", "Need $" + packPrice)
        return
    }
    money -= packPrice
    packs += 1
    openPack()
})

controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (busy) {
        return
    }
    if (screenMode == 0) {
        if (collectionSets.length > 0) {
            selectedCard = collectionSets.length - 1
        } else {
            selectedCard = 0
        }
        screenMode = 1
    } else {
        showHome()
    }
})

controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (busy) {
        return
    }
    if (screenMode == 2) {
        showHome()
    } else {
        screenMode = 2
    }
})

function addCardToCollection(rarity: string, characterName: string, value: number, openingValue: number) {
    collectionSets.push(setName)
    collectionRarities.push(rarity)
    collectionCharacters.push(characterName)
    collectionValues.push(value)
    collectionOpenValues.push(openingValue)
}

function getCollectionMarketValue(): number {
    let total = 0
    for (let i = 0; i < collectionValues.length; i++) {
        total += getSaleValue(i)
    }
    return total
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

function sellSelectedCard() {
    if (collectionSets.length == 0) {
        game.splash("NO CARDS TO SELL")
        return
    }

    let soldRarity = collectionRarities[selectedCard]
    let soldCharacter = collectionCharacters[selectedCard]
    let saleValue = getSaleValue(selectedCard)

    busy = true
    let confirmed = game.ask("SELL " + shortCharacter(soldCharacter) + "?", shortRarity(soldRarity) + "  $" + saleValue)
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

// -----------------------------------------------------------------
// CHARACTER CATALOG
// One starter character for each of the seven card types in each set.
// This is intentionally centralized so more characters can be added later.
// -----------------------------------------------------------------

function getCharacterName(currentSet: number, rarity: string): string {
    if (currentSet == 0) {
        if (rarity == "NORMAL") return "Psyduck"
        if (rarity == "HOLOGRAPH") return "Rayquaza"
        if (rarity == "EX") return "Dragapult ex"
        if (rarity == "ILLUSTRATION RARE") return "Carbink"
        if (rarity == "ULTRA RARE") return "Mega Dragonite ex"
        if (rarity == "SPECIAL ILLUSTRATION") return "Team Rocket Mewtwo ex"
        return "Mega Gengar ex"
    }

    if (currentSet == 1) {
        if (rarity == "NORMAL") return "Baltoy"
        if (rarity == "HOLOGRAPH") return "Delphox"
        if (rarity == "EX") return "Beedrill ex"
        if (rarity == "ILLUSTRATION RARE") return "Froakie"
        if (rarity == "ULTRA RARE") return "Mega Dragalge ex"
        if (rarity == "SPECIAL ILLUSTRATION") return "Cinccino ex"
        return "Mega Greninja ex"
    }

    if (currentSet == 2) {
        if (rarity == "NORMAL") return "Snorlax"
        if (rarity == "HOLOGRAPH") return "Gengar"
        if (rarity == "EX") return "Meowth ex"
        if (rarity == "ILLUSTRATION RARE") return "Dedenne"
        if (rarity == "ULTRA RARE") return "Decidueye ex"
        if (rarity == "SPECIAL ILLUSTRATION") return "Mega Starmie ex"
        return "Mega Zygarde ex"
    }

    if (rarity == "NORMAL") return "Wailmer"
    if (rarity == "HOLOGRAPH") return "Slowbro"
    if (rarity == "EX") return "Mega Excadrill ex"
    if (rarity == "ILLUSTRATION RARE") return "Goldeen"
    if (rarity == "ULTRA RARE") return "Morpeko ex"
    if (rarity == "SPECIAL ILLUSTRATION") return "Mega Zeraora ex"
    return "Mega Darkrai ex"
}

// Portrait infrastructure. These are generated placeholder portraits for now.
// Later each character can return its own hand-drawn sprite without changing
// the collection or reveal systems.
function getCharacterPortrait(currentSet: number, rarity: string): Image {
    let portrait = image.create(24, 24)
    let setColor = 5
    if (currentSet == 1) setColor = 2
    if (currentSet == 2) setColor = 7
    if (currentSet == 3) setColor = 13

    let rarityColor = 1
    if (rarity == "HOLOGRAPH") rarityColor = 9
    if (rarity == "EX") rarityColor = 4
    if (rarity == "ILLUSTRATION RARE") rarityColor = 10
    if (rarity == "ULTRA RARE") rarityColor = 6
    if (rarity == "SPECIAL ILLUSTRATION") rarityColor = 14
    if (rarity == "MEGA HYPER RARE") rarityColor = 15

    portrait.fill(0)
    portrait.fillRect(4, 3, 16, 4, rarityColor)
    portrait.fillRect(6, 7, 12, 10, setColor)
    portrait.fillRect(4, 17, 16, 4, rarityColor)
    portrait.setPixel(9, 10, 1)
    portrait.setPixel(14, 10, 1)
    portrait.fillRect(10, 14, 4, 1, 1)
    return portrait
}

function makePack(): Sprite {
    let pack = sprites.create(img`
        . . 2 2 2 2 2 2 2 2 2 2 2 2 . .
        . . 2 4 4 4 4 4 4 4 4 4 4 2 . .
        . . 2 4 4 5 5 5 5 5 5 4 4 2 . .
        . . 2 4 5 5 5 5 5 5 5 5 4 2 . .
        . . 2 4 5 5 7 7 7 7 5 5 4 2 . .
        . . 2 4 5 7 7 7 7 7 7 5 4 2 . .
        . . 2 4 5 7 7 7 7 7 7 5 4 2 . .
        . . 2 4 5 5 7 7 7 7 5 5 4 2 . .
        . . 2 4 5 5 5 5 5 5 5 5 4 2 . .
        . . 2 4 4 5 5 5 5 5 5 4 4 2 . .
        . . 2 4 4 4 4 4 4 4 4 4 4 2 . .
        . . 2 4 4 4 4 4 4 4 4 4 4 2 . .
        . . 2 4 4 4 4 4 4 4 4 4 4 2 . .
        . . 2 2 2 2 2 2 2 2 2 2 2 2 . .
    `, SpriteKind.Player)
    pack.setPosition(80, 60)
    return pack
}

function crinkle(pack: Sprite) {
    music.playTone(220, 60)
    pack.x = 75
    pause(60)
    music.playTone(280, 60)
    pack.x = 85
    pause(60)
    music.playTone(220, 60)
    pack.x = 75
    pause(60)
    music.playTone(330, 60)
    pack.x = 85
    pause(60)
    music.playTone(260, 60)
    pack.x = 80
}

function openPack() {
    busy = true
    scene.setBackgroundColor(1)
    game.splash(setName, "OPENING PACK!")
    let pack = makePack()
    pause(500)
    game.splash("CRINKLE!", "CRINKLE!")
    crinkle(pack)
    pause(300)
    game.splash("RIP!", "PACK OPEN!")
    music.playTone(440, 70)
    pause(70)
    music.playTone(550, 70)
    pause(70)
    music.playTone(660, 70)
    pause(70)
    music.playTone(880, 120)
    pack.destroy()
    pause(300)

    revealCard(1)
    revealCard(2)
    revealCard(3)
    revealCard(4)
    revealCard(5)

    // Prices move once, after the entire pack is finished.
    updateMarket()
    game.splash("PACK COMPLETE!", "Market prices moved!")
    showHome()
}

function revealCard(number: number) {
    let roll = randint(1, 100)
    let rarity = "NORMAL"

    if (roll <= 5) {
        rarity = "ULTRA RARE"
    } else if (roll <= 15) {
        rarity = "ILLUSTRATION RARE"
    } else if (roll <= 35) {
        rarity = "EX"
    } else if (roll <= 65) {
        rarity = "HOLOGRAPH"
    }

    let sirHit = false
    let mhrHit = false

    if (setNumber == 0) {
        sirHit = randint(1, 70) == 1
        mhrHit = randint(1, 540) == 1
    } else if (setNumber == 1) {
        sirHit = randint(1, 83) == 1
        mhrHit = randint(1, 956) == 1
    } else if (setNumber == 2) {
        sirHit = randint(1, 81) == 1
        mhrHit = randint(1, 1786) == 1
    } else {
        let sirOdds = randint(80, 125)
        let mhrOdds = randint(1260, 1370)
        sirHit = randint(1, sirOdds) == 1
        mhrHit = randint(1, mhrOdds) == 1
    }

    if (sirHit) rarity = "SPECIAL ILLUSTRATION"
    if (mhrHit) rarity = "MEGA HYPER RARE"

    let characterName = getCharacterName(setNumber, rarity)
    let cardValue = getBaseValue(rarity)
    let openingValue = getOpeningSaleValue(rarity, cardValue)

    scene.setBackgroundColor(1)
    if (rarity == "SPECIAL ILLUSTRATION") {
        scene.setBackgroundColor(13)
        music.playTone(523, 100)
        pause(80)
        music.playTone(659, 100)
        pause(80)
        music.playTone(784, 150)
    }
    if (rarity == "MEGA HYPER RARE") {
        scene.setBackgroundColor(2)
        music.playTone(523, 100)
        pause(80)
        music.playTone(659, 100)
        pause(80)
        music.playTone(784, 100)
        pause(80)
        music.playTone(988, 200)
    }

    game.showLongText(
        "CARD " + number + " / 5\n\n" +
        characterName + "\n" +
        rarity + "\n\n" +
        "OPEN VALUE $" + openingValue,
        DialogLayout.Center
    )

    let sellNow = game.ask("SELL NOW?", shortCharacter(characterName) + "  $" + openingValue)
    if (sellNow) {
        money += openingValue
        game.splash("SOLD FROM PACK", "+$" + openingValue)
    } else {
        addCardToCollection(rarity, characterName, cardValue, openingValue)
        game.splash("CARD KEPT", characterName)
    }
}

function getBaseValue(rarity: string): number {
    if (rarity == "NORMAL") return 1
    if (rarity == "HOLOGRAPH") return 2
    if (rarity == "EX") return 5
    if (rarity == "ILLUSTRATION RARE") return 15
    if (rarity == "ULTRA RARE") return 30
    if (rarity == "SPECIAL ILLUSTRATION") return 75
    if (rarity == "MEGA HYPER RARE") return 250
    return 1
}
