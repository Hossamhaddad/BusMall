'use strict';
var leftImageIndex;
var midImageIndex;
var rightImageIndex;
var leftImageElement=document.getElementById('leftImage');
var midImageElement=document.getElementById('midImage');
var rightImageElement=document.getElementById('rightImage');
var maxAttempts=25;
var attemptsCounter=0;
var productName=[];
var productRender=[];
var productVote=[];
var lastLeftIndex=-1;
var lastMidIndex=-1;
var lastRightIndex=-1;
function ProductImage(name,source){
  this.name=name;
  this.source=source;
  this.votes=0;
  this.render=0;
  ProductImage.prototype.allProducts.push(this);
  productName.push(this.name);
}

ProductImage.prototype.allProducts=[];
new ProductImage('bag','img/bag.jpg');
new ProductImage('banana','img/banana.jpg');
new ProductImage('bathroom','img/bathroom.jpg');
new ProductImage('boots','img/boots.jpg');
new ProductImage('breakfast','img/breakfast.jpg');
new ProductImage('bubblegum','img/bubblegum.jpg');
new ProductImage('chair','img/chair.jpg');
new ProductImage('cthulhu','img/cthulhu.jpg');
new ProductImage('dog-duck','img/dog-duck.jpg');
new ProductImage('dragon','img/dragon.jpg');
new ProductImage('pen','img/pen.jpg');
new ProductImage('pet-sweep','img/pet-sweep.jpg');
new ProductImage('scissors','img/scissors.jpg');
new ProductImage('shark','img/shark.jpg');
new ProductImage('sweep','img/sweep.png');
new ProductImage('tauntaun','img/tauntaun.jpg');
new ProductImage('unicorn','img/unicorn.jpg');
new ProductImage('usb','img/usb.gif');
new ProductImage('water-can','img/water-can.jpg');
new ProductImage('wine-glass','img/wine-glass.jpg');

function randomindex(){
  return Math.floor(Math.random() * (ProductImage.prototype.allProducts.length));
}
function renderThreeRandomImages(){
  var previousindex=[lastLeftIndex,lastMidIndex,lastRightIndex];;
  do{
    leftImageIndex=randomindex();
  }while(previousindex.includes(leftImageIndex));
  lastLeftIndex=leftImageIndex;
  previousindex.push(leftImageIndex);
 do {
  rightImageIndex=randomindex();
  }while(previousindex.includes(rightImageIndex));
  lastRightIndex=rightImageIndex;
  previousindex.push(rightImageIndex);
  do {
    midImageIndex=randomindex();
  }while(previousindex.includes(midImageIndex));
  lastMidIndex=midImageIndex;
  previousindex.push(midImageIndex);

  leftImageElement.src= ProductImage.prototype.allProducts[leftImageIndex].source;
  midImageElement.src= ProductImage.prototype.allProducts[midImageIndex].source;
  rightImageElement.src= ProductImage.prototype.allProducts[rightImageIndex].source;
  ProductImage.prototype.allProducts[leftImageIndex].render++;
  ProductImage.prototype.allProducts[midImageIndex].render++;
  ProductImage.prototype.allProducts[rightImageIndex].render++;
}
renderThreeRandomImages();
leftImageElement.addEventListener('click',userClick);
midImageElement.addEventListener('click',userClick);
rightImageElement.addEventListener('click',userClick);

function userClick(event){
  attemptsCounter++;
  if(attemptsCounter<=maxAttempts){
    if(event.target.id === 'leftImage'){
      ProductImage.prototype.allProducts[leftImageIndex].votes++;
    }else if(event.target.id === 'midImage'){
      ProductImage.prototype.allProducts[midImageIndex].votes++;
    } else if(event.target.id === 'rightImage'){
      ProductImage.prototype.allProducts[rightImageIndex].votes++;
    }
    renderThreeRandomImages();
  }else{
    var results=document.getElementById('results');
    var productsResults;
    var percentage;
    for(var i=0;i<ProductImage.prototype.allProducts.length;i++){
      percentage=ProductImage.prototype.allProducts[i].votes/ProductImage.prototype.allProducts[i].render*100;
      productRender.push(ProductImage.prototype.allProducts[i].render);
      productVote.push(ProductImage.prototype.allProducts[i].votes);
      if(!isNaN(percentage)){
        productsResults=document.createElement('li');
        productsResults.textContent=ProductImage.prototype.allProducts[i].name+ ' had '+ProductImage.prototype.allProducts[i].votes+ ' votes, and was seen '+ProductImage.prototype.allProducts[i].render+' times. Percentage = '+parseInt(percentage)+' % ';
        results.appendChild(productsResults);
      }
    }
    leftImageElement.removeEventListener('click',userClick);
    midImageElement.removeEventListener('click',userClick);
    rightImageElement.removeEventListener('click',userClick);
    chart();
  }
}

function clickFunction(){
  var click=document.getElementById('results');
  click.style.display='block';
}
var numOfVotes=document.getElementById('rounds-form');
numOfVotes.addEventListener('submit',submitter);
function submitter(event){
  event.preventDefault();
  maxAttempts=event.target.votes.value;
}



function chart (){
var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: productName,
    datasets: [{
      label: 'Render',
      backgroundColor: 'crimson',
      borderColor: 'rgb(255, 99, 132)',
      data: productRender,}, 
    {
      label: 'Votes',
      backgroundColor: 'red',
      borderColor: 'rgb(255, 99, 132)',
      data: productVote,
    }]
  },
  options: {
  }
});
}
