# SquidEdit
Plugin for [flying squid](https://github.com/PrismarineJS/flying-squid) similar to "world edit".

# Installation

`$ npm install squidedit`

# Commands

# Selection

## /pos1
Description: *Set first position to your location*\
Usage: *pos1*

## /pos2
Description: *Set second position to your location*\
Usage: *pos2*

# History

## /undo
Description: *Undo your last action*\
Usage: *undo*

## /redo
Description: *Redo your last action*\
Usage: *redo*

# Editing

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