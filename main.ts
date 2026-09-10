// CARD PACK SHOP - MAIN ORCHESTRATION
// Keep this file small: shared state, startup, set selection, and controls.

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
let normalMarket = 100
let holographMarket = 100
let exMarket = 100
let illustrationMarket = 100
let ultraMarket = 100
let sirMarket = 100
let mhrMarket = 100

scene.setBackgroundColor(9)
game.splash("CARD PACK SHOP", "DRAFT 1.8")
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

controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (busy || screenMode != 0) return

    setNumber -= 1
    if (setNumber < 0) setNumber = 3
    updateSet()
})

controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (busy || screenMode != 0) return

    setNumber += 1
    if (setNumber > 3) setNumber = 0
    updateSet()
})

controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (busy) return

    if (screenMode == 1 && collectionSets.length > 0) {
        selectedCard -= 1
        if (selectedCard < 0) selectedCard = 0
    }
})

controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (busy) return

    if (screenMode == 1 && collectionSets.length > 0) {
        selectedCard += 1
        if (selectedCard >= collectionSets.length) {
            selectedCard = collectionSets.length - 1
        }
    }
})

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (busy) return

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
    if (busy) return

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
    if (busy) return

    if (screenMode == 2) {
        showHome()
    } else {
        screenMode = 2
    }
})
