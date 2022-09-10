// let inputBtn = document.querySelector("#input-btn")
// inputBtn.addEventListener("click", function(){
//     console.log("BUTTON CLICKED!")
// })

let myLeads = []
const inputEl = document.querySelector("#input-el")
let inputBtn = document.querySelector("#input-btn")
const ulEl = document.querySelector("#ul-el")
const delBtn = document.querySelector("#delete-btn")
const tabBtn = document.querySelector("#tab-btn")

let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
if (leadsFromLocalStorage){
    myLeads = leadsFromLocalStorage
    render(myLeads)
}


tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
        
    })


    
})




function render(leads){
    let listItems = ""
    for (let i = 0; i < leads.length; i += 1){
        listItems += `<li>
        <a href="${leads[i]}" target="_blank">${leads[i]}</a>
        </li>`
    }
    ulEl.innerHTML = listItems
}

delBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads.length = 0
    ulEl.innerHTML = ""
})

inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)
    console.log(localStorage.getItem("myLeads"))
    
})



