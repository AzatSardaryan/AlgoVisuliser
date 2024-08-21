let array = [];
const arraySize = 20;
let isSorting = false;

function resetArray() {
    array = [];
    isSorting = false;
    for (let i = 0; i < arraySize; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }
    displayArray();
}

function displayArray() {
    const container = document.getElementById('array-container');
    container.innerHTML = '';
    for (let i = 0; i < array.length; i++) {
        const bar = document.createElement('div');
        bar.style.height = `${array[i]}%`;
        bar.classList.add('bar');
        container.appendChild(bar);
        console.log(`Bar ${i}: ${bar.style.height}`); 
    } 
}

async function bubbleSort() {
    isSorting = true;
    const bars = document.getElementsByClassName('bar');
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            
            if (!isSorting) return; // Stop if reset is called
            // Highlight the bars being compared
            bars[j].style.backgroundColor = '#e74c3c'; // red
            bars[j + 1].style.backgroundColor = '#e74c3c'; // red

            await delay(getSpeed());

            if (array[j] > array[j + 1]) {
                // Swap the heights in the array
                [array[j], array[j + 1]] = [array[j + 1], array[j]];

                // Visually swap the bars
                await swap(bars, j, j + 1);
            }

            // Revert the color back to normal after comparison
            bars[j].style.backgroundColor = '#3498db'; // blue
            bars[j + 1].style.backgroundColor = '#3498db'; // blue
        }
        bars[array.length - i - 1].style.backgroundColor = '#2ecc71'; // green, sorted
    }
    bars[0].style.backgroundColor = '#2ecc71'; // green, last bar is also sorted
}

function swap(bars, idx1, idx2) {
    return new Promise((resolve) => {
        // Get the initial positions of the bars
        const bar1Position = bars[idx1].getBoundingClientRect();
        const bar2Position = bars[idx2].getBoundingClientRect();

        // Calculate the distance to move
        const distance = bar2Position.left - bar1Position.left;

        // Apply the transformation to visually swap the bars
        bars[idx1].style.transform = `translateX(${distance}px)`;
        bars[idx2].style.transform = `translateX(${-distance}px)`;

        // Wait for the animation to complete
        setTimeout(() => {
            // Reset the transform property
            bars[idx1].style.transform = '';
            bars[idx2].style.transform = '';

            // Swap the bars in the DOM by removing and reinserting them
            const parent = bars[idx1].parentNode;
            console.log(parent)
            const bar1 = bars[idx1];
            const bar2 = bars[idx2];

            parent.removeChild(bar1);
            parent.removeChild(bar2);

            // Reinsert the bars in the correct order
            if (idx1 < idx2) {
                parent.insertBefore(bar2, parent.children[idx1]);
                parent.insertBefore(bar1, parent.children[idx2]);
            } else {
                parent.insertBefore(bar1, parent.children[idx2]);
                parent.insertBefore(bar2, parent.children[idx1]);
            }

            resolve();
        }, getSpeed()); // Adjust speed according to the range input
    });
}

function getSpeed() {
    const speed = document.getElementById('speedRange').value;
    return (101 - speed) * 10; // Adjust speed
}

function startSort() {
    bubbleSort();
}

function delay(ms) {
    return new Promise(resolve=> setTimeout(resolve, ms))
}

resetArray();
