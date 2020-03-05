var slider_num = document.getElementById('slider_num');
var slider = document.getElementById('my_slider');
var shuffle_btn = document.getElementById('shuffle');
var bubble_btn = document.getElementById('bubble')
var insertion_btn = document.getElementById('insertion')
var merge_btn = document.getElementById('merge')
var array = [];
var b = []

slider.addEventListener('change', function(){
  slider_num.innerHTML = this.value;
  array = createArray();
  array = shuffle(array);
  drawBars(array);
});

shuffle_btn.addEventListener('click', function(){
  array = shuffle(array);
  drawBars(array);
});

bubble_btn.addEventListener('click', function(){
  bubbleSort(array);
});

insertion_btn.addEventListener('click', function(){
  insertionSort(array, array.length-1);
});

merge_btn.addEventListener('click', function(){
  console.log(array)
  mergeSort(array, [], array.length);
  console.log(array)
});

function createArray(){
  array = [];
  for (var i=0;i<slider.value;i++) array[i] = i+parseInt(slider.min);
  return array;
};

function shuffle(array) {
  var tmp, current, top = array.length;
  if(top) while(--top) {
    current = Math.floor(Math.random() * (top + 1));
    tmp = array[current];
    array[current] = array[top];
    array[top] = tmp;
  };
  return array;
};

// Sorting functions
async function bubbleSort(array){
  var n = array.length;
  while (n > 1) {
    var new_n = 0;
    for (var i = 1; i < array.length; i++) {
      if (array[i-1] > array[i]) {
        swap(array,i,i-1)
        await drawBars(array,i)
        new_n = i;
      }
    }
    n = new_n;
  }
};

async function insertionSort(array) {
  var i = 1;
  while (i < array.length) {
    var j = i;
    while (j > 0 && array[j-1] > array[j]) {
      swap(array,j,j-1);
      await drawBars(array,j);
      j = j - 1;
    }
    i++;
  }
}

async function mergeSort(array, b, n) {
  b = [];
  for (var w = 1; w < n; w = 2 * w) {
    for (var i = 0; i < n; i = i + 2 * w) {
      merge(array, i, Math.min(i+w, n), Math.min(i+2*w, n), b)
    }
    copyArray(b, array, n)
    await drawBars(array)
  }
}

async function merge(array, iLeft, iRight, iEnd, b = []) {
  var i = iLeft, j = iRight;
  //await timer(100)

  for (var k = iLeft; k < iEnd; k++) {
    if (i < iRight && (j >= iEnd || array[i] <= array[j])) {
      b[k] = array[i];
      i++;
      console.log(b)
      console.log(array)
      console.log(i)
      console.log(k)
      //await drawBars(array,i,k,100)
    } else {
      b[k] = array[j];
      j++;
      console.log(b)
      console.log(array)
      console.log(j)
      console.log(k)
      //await drawBars(array,j,k,100)
    }
  }
}

async function copyArray(b, a, n) {
  for (var i = 0; i < n; i++) {
    a[i] = b[i];
  }
}

function swap(array, i, k){
  var tmp = array[i]
  array[i] = array[k]
  array[k] = tmp
  return array
}

// Canvas code
var myCanvas = document.getElementById('myCanvas');

// canvas width / array length must be whole number.
//myCanvas.width = 400px;
//myCanvas.height = 400px;

var ctx = myCanvas.getContext('2d');

async function drawBars(array, b1 = -1, b2 = -1, t = 10){

  await timer(t);
  //clear Canvas
  ctx.clearRect(0,0,myCanvas.width,myCanvas.height);
  // Width of bar
  var w = ( myCanvas.width / array.length );
  // Take an array of values, and draw a bar associated with index and height = array[i]
  for (var i = 0; i < array.length; i++) {
    if (i === b1 || i === b2) {
      ctx.fillStyle = "orange"
    } else {
      ctx.fillStyle = 'blue'
    }
    uLX = w * i;
    uLY = myCanvas.height - array[i]*3;
    barWidth = w - 1;
    barHeight = array[i]*3;
    ctx.fillRect(uLX, uLY, barWidth, barHeight);
  }

};

function timer(ms) {
  return new Promise(res => setTimeout(res, ms));
}

// On load function calls
window.onload = () => {
  array = createArray();
  shuffle(array);
  drawBars(array);
};
