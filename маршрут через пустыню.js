/**
 * Когда-то, на пути через старый дикий запад, ...
 * ... человеку дали указания перейти от одной точки к другой. Направления были «СЕВЕР»,
 * «ЮЖНЫЙ», «ЗАПАД», «ВОСТОК». Очевидно, что «СЕВЕР» и «ЮГ» противоположны, «ЗАПАД» и «ВОСТОК».
 * Переход в одно направление и возвращение в противоположном направлении
 * - это ненужное усилие. Поскольку это дикий запад, с ужасной погодой и не так много воды,
 *  важно сэкономить немного энергии, иначе вы можете умереть от жажды!
 * Как я пересек пустыню умным способом.
 * Указания, данные человеку, например, следующие
 * «СЕВЕР», «ЮЖНЫЙ», «ЮЖНЫЙ», «ВОСТОЧНЫЙ», «ЗАПАД», «СЕВЕР», «ЗАПАД»).
 * или
 * {«СЕВЕР», «ЮЖНЫЙ», «ЮЖНЫЙ», «ВОСТОЧНЫЙ», «ЗАПАД», «СЕВЕР», «ЗАПАД»};
 * Вы можете сразу увидеть, что движение «СЕВЕР», а затем «ЮГ» не разумно,
 *
 * лучше оставаться на том же месте! Поэтому задача состоит в том, чтобы дать человеку
 * упрощенную версию плана. Лучшим планом в этом случае является просто:
 * [ "WEST"]
 * или
 * {"ЗАПАД"}
 *
 *
 *
 *
 */

function dirReduc(arr){
  let v ={ NORTH:100, SOUTH:-100, EAST: 0.01, WEST: -0.01 };

  let mapArr = arr.map(a => v[a]);
  return del(del(mapArr)).map(a=>{
    for(let name in v){
      if(v[name]==a){
        return name;
      }
    }
  })

};

function del(w){
  let i=0;
  while(i<=w.length){
    if(w[i]+w[i+1]==0){
      w.splice(i,2);
      i++
      continue;
    };
    i++
  }
  return w
};

console.log(dirReduc(["NORTH", "SOUTH", "SOUTH", "EAST", "WEST", "NORTH", "WEST"]))// ["WEST"])
console.log(dirReduc(["NORTH", "WEST", "SOUTH", "EAST"]))                          // ["NORTH", "WEST", "SOUTH", "EAST"])
console.log(dirReduc(["NORTH", "SOUTH", "EAST", "WEST", "EAST", "WEST"]))          // [])

function dirReduc0(plan) {
  var opposite = {
    'NORTH': 'SOUTH', 'EAST': 'WEST', 'SOUTH': 'NORTH', 'WEST': 'EAST'};
  return plan.reduce(function(dirs, dir){
    if (dirs[dirs.length - 1] === opposite[dir])
      dirs.pop();
    else
      dirs.push(dir);
    return dirs;
  }, []);
}

// второй вариант


function dirReduc1(arr) {
  var str = arr.join(''), pattern = /NORTHSOUTH|EASTWEST|SOUTHNORTH|WESTEAST/;
  while (pattern.test(str)) str = str.replace(pattern,'');
  return str.match(/(NORTH|SOUTH|EAST|WEST)/g)||[];
}

// третий вариант
function dirReduc2(arr){
  var opposite = { "SOUTH":"NORTH", "NORTH":"SOUTH", "WEST":"EAST", "EAST":"WEST"}
  return arr.reduce(function (a, b, i) {
    opposite[a.slice(-1)] === b ? a.pop() : a.push(b)
    return a
  }, [])
}

// четвертый варант

function isOppo(dir1,dir2) {
  if (dir1 + dir2 === 'SOUTHNORTH') return true;
  if (dir1 + dir2 === 'NORTHSOUTH') return true;
  if (dir1 + dir2 === 'EASTWEST') return true;
  if (dir1 + dir2 === 'WESTEAST') return true;
  return false;
}

function dirReduc3(arr){
  var len = arr.length
  for (var i = 0; i < len - 1; i++) {
    if (isOppo(arr[i], arr[i+1])) {
      arr.splice(i,2);
      return dirReduc(arr);
    }
  }
  return arr;
}
