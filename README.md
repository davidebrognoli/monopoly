# Monopoly

This is a simple implementation of Monopoly Game

## Release 1: Basic Board and Player Movement
For this first release, we want to be able to support the basic player movement. All players start on the first location. The players' order is initially determined randomly and then maintained for the remainder of the game. Each player takes a turn, during which they roll a pair of dice, move from their current location to a destination calculated based on their current location plus the roll of the dice. The board has a total of 40 locations. When the player reaches the end of the board, s/he starts back at the beginning again. Since this version is so simple, we'll simply play a total of 20 rounds, where a round means every player takes a turn.

## Test

**You’ll need to have Node >= 6 on your machine**.
After cloning the repo, you'll need to run yarn.
Then you can run yarn test.