# SquidEdit
Plugin for [flying squid](https://github.com/PrismarineJS/flying-squid) similar to "world edit".

# Selection
You can select area with wooden axe\
Or with commands `/pos1` and `/pos2`.

# Installation

`$ npm install squid-edit`

# Commands

## /set
Description: *Fills area with blocks*\
Usage: *set <block || blocks> ex. blocks: 1,2,3*

## /replace
Description: *Replaces blocks in area*\
Usage: *replace <block || blocks> ex.blocks: 1,2,3 && <block || blocks> ex.blocks: 1,2,3; Air will be replaced if argument #2 don't specified; All arguments are optional*

## /sphere
Description: *Creates sphere*\
Usage: *sphere <block || blocks> ex. blocks: 1,2,3 && <radius: int>*

## /hsphere
Description: *Creates hollow sphere*\
Usage: *sphere <block || blocks> ex. blocks: 1,2,3 && <radius: int>*

## /cyl
Description: *Creates cylinder*\
Usage: *cyl <block || blocks> ex. blocks: 1,2,3 && <height: int> <radius: int>*

## /hcyl
Description: *Creates hollow cylinder*\
Usage: *cyl <block || blocks> ex. blocks: 1,2,3 && <height: int> <radius: int>*

## /cyl
Description: *Set first position to your or specific location*\
Usage: *cyl <block || blocks> ex. blocks: 1,2,3 && <height: int> <radius: int>*

## /pos1
Description: *Set first position to your location*\
Usage: *pos1 x,y,z (optional)*

## /pos2
Description: *Set first position to your location*\
Usage: *pos2 x,y,z (optional)*