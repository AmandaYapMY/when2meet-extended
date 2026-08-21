# When2Meet Highlighter Extended
A Chrome extension that makes it easier to compare the availability of multiple people on [When2Meet](https://www.when2meet.com).

When2Meet Extended allows you to select one or more participants and visually see their availability. When multiple participants are selected, the times when **everyone selected is available** are highlighted with diagonal hatching.

## When is this useful?
When2Meet already shows the overall availability of everyone in a group. However, there may be situations where [**only certain people need to be available**] for a meeting or activity, while the overall group availability is still useful for other purposes.

This extension makes it easier to identify these **specific groups of people and their common availability** without losing the original When2Meet group availability view.

## Features
- Highlight an individual participant's availability.
- Select multiple participants at the same time.
- Identify the common availability of all selected participants.
- Diagonal hatching indicates times when **all selected participants are available**.
- Overlap areas are outlined to make continuous availability easier to identify.
- Click a participant's name again to remove them from the selection.
- **Reset** button to deselect everyone and return to the default When2Meet view.
- Includes a legend explaining the overlap highlighting.

## Installation
### Chrome Web Store [Coming soon]
1. Install the extension from the Chrome Web Store.
2. Open a [When2Meet](https://www.when2meet.com) event.
3. The extension will automatically appear on the page.

### Developer Installation
1. Download or clone this repository.
2. Open `chrome://extensions` in Google Chrome.
3. Enable **Developer mode**.
4. Click **Load unpacked**.
5. Select the project folder.
6. Open or refresh a When2Meet event.

## How to Use

Once the extension is installed, participant names will appear below the When2Meet schedule.

### No selection

When no names are selected, the schedule remains in the normal When2Meet view.

**Default When2Meet view**
<img width="1380" height="1047" alt="Screenshot 2026-08-21 165548" src="https://github.com/user-attachments/assets/8c0d2381-16ce-4386-bb4e-3eaf593a68dd" />

### One person selected
Selecting one participant highlights the times when that person is available.

**One person selected**
<img width="1384" height="1036" alt="Screenshot 2026-08-21 165605" src="https://github.com/user-attachments/assets/78cf6e26-3ce3-4671-8d15-5c537c1b4436" />

### Two people selected
Selecting two participants highlights their availability. The diagonal hatching indicates the times when **both selected participants are available**.

**Two people selected**
<img width="1380" height="1066" alt="Screenshot 2026-08-21 165619" src="https://github.com/user-attachments/assets/81985a54-3a95-496b-beb1-49299f7a8c66" />

### Three people selected
Selecting three participants highlights their availability. The diagonal hatching now only appears during times when **all three selected participants are available**.

**Three people selected**
<img width="1380" height="1078" alt="Screenshot 2026-08-21 165632" src="https://github.com/user-attachments/assets/e0539cd5-61c3-4e7b-88a6-aec362794d4b" />

The same behaviour applies when selecting more than three participants: the hatching only appears when **every selected participant is available**.

## Understanding the Colours
The highlighted colour represents the availability of a selected participant.

When multiple participants are selected, the availability colours may overlap. The **diagonal hatching** is used to clearly identify the times that are available to everyone selected.

The extension also includes a legend below the participant buttons:

> **Overlap: all selected people are available**

## Acknowledgements
This project is built upon and inspired by [When2Meet Highlighter](https://github.com/JRJurman/when2meet-highlighter) by [JRJurman](https://github.com/JRJurman).

The original project provides individual participant availability highlighting. This project extends the concept with multi-person selection, common availability highlighting, overlap hatching, and a reset function.

## Notes
This extension is designed for the current version of the When2Meet website. Changes to When2Meet's page structure or JavaScript variables may require updates to the extension.
