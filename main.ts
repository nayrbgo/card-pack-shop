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
let collectionValues: number[] = []

// MARKET VALUES AS PERCENTAGES
// 100 = 1.00x, 125 = 1.25x, 80 = 0.80x
let commonMarket = 100
let uncommonMarket = 100
let rareMarket = 100
let illustrationMarket = 100
let ultraMarket = 100
let sirMarket = 100
let mhrMarket = 100

scene.setBackgroundColor(9)

game.splash("CARD PACK SHOP", "DRAFT 1.4")

updateSet()
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
    if (busy) {
        return
    }

    if (screenMode == 0) {
        setNumber -= 1

        if (setNumber < 0) {
            setNumber = 3
        }

        updateSet()
    }
})

controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (busy) {
        return
    }

    if (screenMode == 0) {
        setNumber += 1

        if (setNumber > 3) {
            setNumber = 0
        }

        updateSet()
    }
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

function addCardToCollection(rarity: string, value: number) {
    collectionSets.push(setName)
    collectionRarities.push(rarity)
    collectionValues.push(value)
}

function getCollectionBaseValue(): number {
    let total = 0

    for (let i = 0; i < collectionValues.length; i++) {
        total += collectionValues[i]
    }

    return total
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

    screen.print("MY COLLECTION", 36, 5, 7, image.font8)

    screen.print(
        "CARDS " + collectionSets.length +
        "  VALUE $" + getCollectionMarketValue(),
        8,
        18,
        7,
        image.font5
    )

    screen.drawLine(5, 27, 154, 27, 7)

    if (collectionSets.length == 0) {
        screen.print("NO CARDS YET", 45, 53, 7, image.font5)
        screen.print("OPEN SOME PACKS", 35, 65, 7, image.font5)
        screen.print("B = BACK", 52, 105, 7, image.font5)
        return
    }

    if (selectedCard < 0) {
        selectedCard = 0
    }

    if (selectedCard >= collectionSets.length) {
        selectedCard = collectionSets.length - 1
    }

    let cardsPerPage = 6
    let page = Math.idiv(selectedCard, cardsPerPage)
    let start = page * cardsPerPage
    let end = start + cardsPerPage

    if (end > collectionSets.length) {
        end = collectionSets.length
    }

    let y = 33

    for (let i = start; i < end; i++) {
        let rowColor = 7

        if (i == selectedCard) {
            rowColor = 2
        }

        screen.print(
            (i + 1) + "." + shortSetName(collectionSets[i]),
            5,
            y,
            rowColor,
            image.font5
        )

        screen.print(
            shortRarity(collectionRarities[i]),
            42,
            y,
            rowColor,
            image.font5
        )

        screen.print(
            "$" + getSaleValue(i),
            125,
            y,
            rowColor,
            image.font5
        )

        y += 12
    }

    let maxPage = Math.idiv(collectionSets.length - 1, cardsPerPage)

    screen.print(
        "PAGE " + (page + 1) + "/" + (maxPage + 1),
        5,
        111,
        7,
        image.font5
    )

    screen.print(
        "A=SELL  B=BACK",
        74,
        111,
        7,
        image.font5
    )
}

function sellSelectedCard() {
    if (collectionSets.length == 0) {
        game.splash("NO CARDS TO SELL")
        return
    }

    let soldRarity = collectionRarities[selectedCard]
    let saleValue = getSaleValue(selectedCard)

    money += saleValue

    collectionSets.removeAt(selectedCard)
    collectionRarities.removeAt(selectedCard)
    collectionValues.removeAt(selectedCard)

    if (selectedCard >= collectionSets.length) {
        selectedCard = collectionSets.length - 1
    }

    if (selectedCard < 0) {
        selectedCard = 0
    }

    game.splash(shortRarity(soldRarity) + " SOLD", "+$" + saleValue)
}

function shortSetName(name: string): string {
    if (name == "ASCENDED HEROES") {
        return "AH"
    }

    if (name == "CHAOS RISING") {
        return "CR"
    }

    if (name == "PERFECT ORDER") {
        return "PO"
    }

    return "PB"
}

function shortRarity(rarity: string): string {
    if (rarity == "COMMON") {
        return "COMMON"
    }

    if (rarity == "UNCOMMON") {
        return "UNCOMMON"
    }

    if (rarity == "RARE") {
        return "RARE"
    }

    if (rarity == "ILLUSTRATION RARE") {
        return "ILLUST"
    }

    if (rarity == "ULTRA RARE") {
        return "ULTRA"
    }

    if (rarity == "SPECIAL ILLUSTRATION") {
        return "SIR"
    }

    if (rarity == "MEGA HYPER RARE") {
        return "MHR"
    }

    return rarity
}

function updateMarket() {
    commonMarket = randint(70, 130)
    uncommonMarket = randint(70, 140)
    rareMarket = randint(65, 150)
    illustrationMarket = randint(60, 170)
    ultraMarket = randint(55, 190)
    sirMarket = randint(50, 220)
    mhrMarket = randint(40, 250)
}

function getMarketPercent(rarity: string): number {
    if (rarity == "COMMON") {
        return commonMarket
    }

    if (rarity == "UNCOMMON") {
        return uncommonMarket
    }

    if (rarity == "RARE") {
        return rareMarket
    }

    if (rarity == "ILLUSTRATION RARE") {
        return illustrationMarket
    }

    if (rarity == "ULTRA RARE") {
        return ultraMarket
    }

    if (rarity == "SPECIAL ILLUSTRATION") {
        return sirMarket
    }

    if (rarity == "MEGA HYPER RARE") {
        return mhrMarket
    }

    return 100
}

function getSaleValue(index: number): number {
    let baseValue = collectionValues[index]
    let marketPercent = getMarketPercent(collectionRarities[index])

    return Math.max(1, Math.idiv(baseValue * marketPercent, 100))
}

function drawMarket() {
    screen.fill(1)

    screen.print("CARD MARKET", 42, 5, 7, image.font8)
    screen.drawLine(5, 18, 154, 18, 7)

    screen.print("RARITY", 8, 23, 7, image.font5)
    screen.print("MARKET", 108, 23, 7, image.font5)

    drawMarketRow("COMMON", commonMarket, 34)
    drawMarketRow("UNCOMMON", uncommonMarket, 46)
    drawMarketRow("RARE", rareMarket, 58)
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

    updateMarket()

    game.splash(
        "PACK COMPLETE!",
        "Cards owned: " + collectionSets.length
    )

    showHome()
}

function revealCard(number: number) {
    let roll = randint(1, 100)
    let rarity = "COMMON"

    if (roll <= 5) {
        rarity = "ULTRA RARE"
    } else if (roll <= 15) {
        rarity = "ILLUSTRATION RARE"
    } else if (roll <= 35) {
        rarity = "RARE"
    } else if (roll <= 65) {
        rarity = "UNCOMMON"
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

    if (sirHit) {
        rarity = "SPECIAL ILLUSTRATION"
    }

    if (mhrHit) {
        rarity = "MEGA HYPER RARE"
    }

    let cardValue = getBaseValue(rarity)

    addCardToCollection(rarity, cardValue)

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
        rarity +
        "\n\nBASE VALUE $" + cardValue,
        DialogLayout.Center
    )
}

function getBaseValue(rarity: string): number {
    if (rarity == "COMMON") {
        return 1
    }

    if (rarity == "UNCOMMON") {
        return 2
    }

    if (rarity == "RARE") {
        return 5
    }

    if (rarity == "ILLUSTRATION RARE") {
        return 15
    }

    if (rarity == "ULTRA RARE") {
        return 30
    }

    if (rarity == "SPECIAL ILLUSTRATION") {
        return 75
    }

    if (rarity == "MEGA HYPER RARE") {
        return 250
    }

    return 1
}
