let array = [];
const arraySize = 20;

function resetArray() {
    array = [];
    for (let i = 0; i < arraySize; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }
    console.log(array)
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
    const bars = document.getElementsByClassName('bar');
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {

            // Red
            bars[j].style.backgroundColor = '#e74c3c';
            bars[j + 1].style.backgroundColor = '#e74c3c';
            
            if (array[j] > array[j + 1]) {
                await swap(bars, j, j + 1);
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }
            
            // blue 
            bars[j].style.backgroundColor = '#3498db';
            bars[j + 1].style.backgroundColor = '#3498db';
        }
        bars[array.length - i - 1].style.backgroundColor = '#2ecc71';
    }
    bars[0].style.backgroundColor = '#2ecc71'; // Last bar is sorted
}

function swap(bars, idx1, idx2) {
    return new Promise((resolve) => {
        const tempHeight = bars[idx1].style.height;
        bars[idx1].style.height = bars[idx2].style.height;
        bars[idx2].style.height = tempHeight;
        setTimeout(() => resolve(), getSpeed());
    });
}

function getSpeed() {
    const speed = document.getElementById('speedRange').value;
    return (101 - speed) * 100; // Adjust speed
}

function startSort() {
    console.log('started sort')
    bubbleSort();
}

resetArray();
