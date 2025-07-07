# Library: Item Select Dialog
A module for Foundry VTT to allow a selection between several items. Automatically switches between ApplicationV1 and ApplicationV2 depending on the Foundry version.

![Github All Releases](https://img.shields.io/github/downloads/JDCalvert/lib-item-select-dialog/total.svg)
![Github Latest Release](https://img.shields.io/github/downloads/JDCalvert/lib-item-select-dialog/1.0.1/total)

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/jdcalvert)

## Usage
The types used by this module can be found [here](https://github.com/JDCalvert/lib-item-select-dialog-types). You can add this repository to your module using git submodules.

The function to show the dialog is exposed in `CONFIG.itemSelectDialog.getItem`. This function takes the following parameters:
- title (string): The dialog's title.
- heading (string): The text to appear before the list of choices.
- sections (Section): The list of items to choose between, grouped into sections. The choices in each section appear within a box under their own header.
- options (Option): A list of checkbox options to display below the list of choices. Each of these options can be initialised to true or false.

`getItem` returns a Response object containing both the selected choice, as well as the state of the checkboxes specified by the options parameter.
