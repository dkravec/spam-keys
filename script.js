const log = document.getElementById('log');

document.addEventListener('keypress', logKey);

var pressed = []

function logKey(e) {
  addnumber(e.key.toLowerCase(), e.code, e)
  log.textContent += e.key;
}

function addnumber(key, code, e){
  var data = {
    key,
    code,
    which: e.which,
    total: 1
  }
 
  var foundKey = false

  for (foundIndex=0;foundIndex < pressed.length; foundIndex++) {
  
    if (!foundKey && pressed[foundIndex].key == key) {
      foundKey = true
      data.total = pressed[foundIndex].total += 1

      pressed[foundIndex].total = data.total
      return renderResult(data)
    }
  }
  if (!foundKey) {
    pressed.push(data)
    return renderResult(data)
  }
}

function renderResult(data){
  const { key, total, code, which } = data

  if (total == 1) {
    document.getElementById('totalkeys').innerHTML+=`
      <div id="${code}"<p>${key}:${total}</p></div>
    `
  }
  else document.getElementById(code).innerHTML=`<p>${key}:${total}</p>`  

  const doc = document.getElementById(`${code}`)

  doc.style.color=pickColour()
}

function sort() {
  document.getElementById("allRanked").innerHTML=``

  // sort by value
  pressed.sort(function (a, b) {
    return a.total - b.total;
  });

  var stringArray=[]

  for (key of pressed) {
    if (key.total == 1) {
        stringArray.push(`<div><p class="standardP">${key.key} pressed ${key.total} time!</p></div>`)
    }
    else {
stringArray.push(`<div><p class="standardP">${key.key} pressed ${key.total} times!</p></div>`)
    }
  }
  document.getElementById("allRanked").innerHTML+=`${stringArray.join("")}`
}

function pickColour() {
  const r = colourNumber()
  const g = colourNumber()
  const b = colourNumber()

  const colour = `rgb(${r}, ${g}, ${b})`
  return colour
}

function colourNumber(){
  return Math.floor(0 + Math.random()*(255 + 1 - 0))
}