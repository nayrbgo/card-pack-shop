// CARD PACK SHOP - PACK OPENING

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

    // Prices move exactly once after the whole pack is finished.
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

    let sellNow = game.ask(
        "SELL NOW?",
        shortCharacter(characterName) + "  $" + openingValue
    )

    if (sellNow) {
        money += openingValue
        game.splash("SOLD FROM PACK", "+$" + openingValue)
    } else {
        addCardToCollection(rarity, characterName, cardValue, openingValue)
        game.splash("CARD KEPT", characterName)
    }
}
