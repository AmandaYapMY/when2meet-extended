(() => {
    document.getElementById('w2m-custom-test')?.remove();

    const selectedPeople = new Set();
    const original = new Map();

    const buttonStyle = (on, hue) => `
        font-size: 1em;
        border-radius: 0.5em;
        border-color: #339900;
        border-width: 0.15em;
        color: ${on ? 'white' : '#339900'};
        background-color: ${on ? '#339900' : 'white'};
        cursor: pointer;
        outline: none;
        margin: 0.25em;
        filter: hue-rotate(${hue}deg);
    `;

    // Save original slot appearance
    TimeOfSlot.forEach(time => {
        const el = document.getElementById(`GroupTime${time}`);

        if (el) {
            original.set(el.id, {
                background: el.style.background,
                filter: el.style.filter,
                backgroundImage: el.style.backgroundImage,
                boxShadow: el.style.boxShadow
            });
        }
    });

    function render() {
        TimeOfSlot.forEach((time, slotIndex) => {
            const el = document.getElementById(`GroupTime${time}`);
            if (!el) return;

            const originalStyle = original.get(el.id);

            if (originalStyle) {
                el.style.background = originalStyle.background;
                el.style.filter = originalStyle.filter;
                el.style.backgroundImage = originalStyle.backgroundImage;
                el.style.boxShadow = originalStyle.boxShadow;
            }

            if (selectedPeople.size === 0) return;

            const availableSelected = [...selectedPeople].filter(id =>
                AvailableAtSlot[slotIndex].includes(id)
            );

            if (availableSelected.length === 0) {
                el.style.background = 'white';
                el.style.filter = 'none';
                el.style.backgroundImage = '';
                el.style.boxShadow = '';
                return;
            }

            const selectedArray = [...selectedPeople];
            let lastSelectedID = null;

            for (let i = selectedArray.length - 1; i >= 0; i--) {
                if (AvailableAtSlot[slotIndex].includes(selectedArray[i])) {
                    lastSelectedID = selectedArray[i];
                    break;
                }
            }

            if (lastSelectedID !== null) {
                const personIndex = PeopleIDs.indexOf(lastSelectedID);
                const hue = (personIndex + 1) * 100;

                if (
                    !el.style.background ||
                    el.style.background === 'rgb(255, 255, 255)' ||
                    el.style.background === 'white'
                ) {
                    el.style.background = '#ddeed5';
                }

                el.style.filter = `hue-rotate(${hue}deg)`;
            }

            // Hatch only where ALL selected people overlap
            if (
                selectedPeople.size >= 2 &&
                availableSelected.length === selectedPeople.size
            ) {
                el.style.backgroundImage =
                    'repeating-linear-gradient(' +
                    '45deg, ' +
                    'transparent 0px, ' +
                    'transparent 4px, ' +
                    'rgba(0,0,0,0.25) 4px, ' +
                    'rgba(0,0,0,0.25) 6px' +
                    ')';
            }
        });
    }

    function applyOverlapBorders() {
        TimeOfSlot.forEach(time => {
            const el = document.getElementById(`GroupTime${time}`);
            if (el) el.style.boxShadow = '';
        });

        if (selectedPeople.size < 2) return;

        const overlapSlots = TimeOfSlot
            .map((time, slotIndex) =>
                [...selectedPeople].every(id =>
                    AvailableAtSlot[slotIndex].includes(id)
                )
                    ? slotIndex
                    : null
            )
            .filter(index => index !== null);

        const isOverlap = (row, col) =>
            overlapSlots.some(index => {
                const el = document.getElementById(
                    `GroupTime${TimeOfSlot[index]}`
                );

                return el &&
                    Number(el.getAttribute('data-row')) === row &&
                    Number(el.getAttribute('data-col')) === col;
            });

        overlapSlots.forEach(slotIndex => {
            const el = document.getElementById(
                `GroupTime${TimeOfSlot[slotIndex]}`
            );

            if (!el) return;

            const row = Number(el.getAttribute('data-row'));
            const col = Number(el.getAttribute('data-col'));
            const shadows = [];

            if (!isOverlap(row - 1, col))
                shadows.push('inset 0 2px 0 rgba(0,0,0,0.7)');

            if (!isOverlap(row + 1, col))
                shadows.push('inset 0 -2px 0 rgba(0,0,0,0.7)');

            if (!isOverlap(row, col - 1))
                shadows.push('inset 2px 0 0 rgba(0,0,0,0.7)');

            if (!isOverlap(row, col + 1))
                shadows.push('inset -2px 0 0 rgba(0,0,0,0.7)');

            el.style.boxShadow = shadows.join(', ');
        });
    }

    const main = document.getElementById('MainBody');
    if (!main) return;

    const menu = document.createElement('div');

    menu.id = 'w2m-custom-test';
    menu.style.padding = '1em';

    // Reset button
    const resetButton = document.createElement('button');

    resetButton.innerText = 'Reset';
    resetButton.style.cssText = buttonStyle(false, 0);

    resetButton.onclick = () => {
        selectedPeople.clear();

        menu.querySelectorAll('[data-person-button]').forEach(button => {
            button.style.cssText =
                buttonStyle(false, Number(button.dataset.hue));

            button.isHighlighted = false;
        });

        render();
    };

    menu.appendChild(resetButton);

    // Person buttons
    PeopleNames.forEach((name, index) => {
        const hue = (index + 1) * 100;
        const userId = PeopleIDs[index];

        const button = document.createElement('button');

        button.innerText = name;
        button.dataset.personButton = 'true';
        button.dataset.hue = hue;
        button.style.cssText = buttonStyle(false, hue);
        button.isHighlighted = false;

        button.onclick = () => {
            if (button.isHighlighted) {
                selectedPeople.delete(userId);
                button.isHighlighted = false;
                button.style.cssText = buttonStyle(false, hue);
            } else {
                selectedPeople.add(userId);
                button.isHighlighted = true;
                button.style.cssText = buttonStyle(true, hue);
            }

            render();
            applyOverlapBorders();
        };

        menu.appendChild(button);
    });

    // Legend
    const legend = document.createElement('div');

    legend.style.cssText = `
        margin-top: 0.5em;
        font-size: 0.9em;
        display: flex;
        align-items: center;
        gap: 0.5em;
    `;

    const hatchSample = document.createElement('span');

    hatchSample.style.cssText = `
        display: inline-block;
        width: 1.5em;
        height: 1.5em;
        border: 1px solid #777;
        background-image: repeating-linear-gradient(
            45deg,
            transparent 0px,
            transparent 4px,
            rgba(0,0,0,0.25) 4px,
            rgba(0,0,0,0.25) 6px
        );
    `;

    const legendText = document.createElement('span');

    legendText.innerText =
        'Overlap: all selected people are available';

    legend.appendChild(hatchSample);
    legend.appendChild(legendText);
    menu.appendChild(legend);

    main.appendChild(menu);

    console.log('When2Meet Multi-Person Highlighter loaded.');
})();
