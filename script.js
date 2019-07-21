
const con = require('electron').remote.getGlobal('console')
let videoConcat = require('./videoconcat');
const { dialog } = require('electron').remote

var itemsPath=[]
var outputPath=""


function onInit(){
    document.getElementById("items-list-container").style.display = "none";
    itemsPath=[]
}

document.getElementById('btn-output').addEventListener('click',function(){
  dialog.showOpenDialog({
    properties: ['openDirectory']
  },function(path,result){
    updatePath(path)
  })
})

function updatePath(path){
  if(path!=null){
    outputPath=path;
    document.getElementById('outpath').innerHTML=path
  }
}
document.getElementById('btn-start').addEventListener('click',function(){

    dialog.showOpenDialog({ properties: ['openFile'] ,
    filters: [
      { name: 'Movies', extensions: ['mp4'] }
    ]},function(path,result){
      updateItems(path)
    })

})

function updateItems(path){
  if(path!=null){
    itemsPath.push(path)
  }
  if(itemsPath.length>0){
    document.getElementById("items-list-container").style.display = "block";
    renderList()
  }else{
    onInit()
  }
}

function renderList(){
  var listRoot=document.getElementById('items-list');
  listRoot.innerHTML=""

  for(var i=0;i<itemsPath.length;i++){
    var newcontent = document.createElement('li');
    newcontent.appendChild(document.createTextNode(itemsPath[i]))
    newcontent.setAttribute('class','list-group-item')
    listRoot.appendChild(newcontent)
  }

}

document.getElementById('btn-add-more').addEventListener('click',function(){
    document.getElementById('btn-start').click()
})


document.getElementById('btn-merge').addEventListener('click',function(){

    videoConcat({
        silent: true, 
        overwrite: false 
      }).clips(itemsPath)
      .output(outputPath+"/file_out.mp4") 
  .concat()
  .then((outputFileName) => {
    console.log(outputFileName)
    console.log()
  });
})

onInit();