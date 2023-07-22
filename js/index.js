// get page elements
document.addEventListener("DOMContentLoaded", ()=>{
    let monsterData=getMonsterData(50, 0)
    console.log(monsterData);
    let monsterContainer=document.getElementById('monster-container')
   
    monsterData.then(data=>{
        console.log(data)
        data.map(monster=>{
            let monsterDiv= document.createElement('div')
            monsterDiv.setAttribute('class', 'monster-card')
            monsterDiv.innerHTML=`
            <h1>${monster.name}</h1>
            <p>${monster.age}</p>
            <p>${monster.description}</p>
            `
            monsterContainer.appendChild(monsterDiv)
        })
        
    }).catch(e=>console.log(e))


    // add create monster event listener

    let form=document.querySelector('form');

    form.addEventListener("submit", (e)=>{
        e.preventDefault()
        let body={}
        let inputs =e.target.querySelectorAll(".input-text");
        inputs.forEach(element => {
           body[`${element.name}`]=element.value
        });
        let createMonster=postMonsterData(body);
        console.log(createMonster)
        form.reset();
    })

    // add listeners to change offsset and limit
    let forward=document.getElementById("forward")
    forward.addEventListener("click", ()=>{
        monsterContainer.innerHTML=``;
        let newmonsterData=getMonsterData(50, 50)
        newmonsterData.then(data=>{
            console.log(data)
            data.map(monster=>{
                let newMonsterDiv= document.createElement('div')
                newMonsterDiv.setAttribute('class', 'monster-card')
                newMonsterDiv.innerHTML=`
                <h1>${monster.name}</h1>
                <p>${monster.age}</p>
                <p>${monster.description}</p>
                `
                monsterContainer.appendChild(newMonsterDiv)
            })
            
        }).catch(e=>console.log(e))
    })


})



// get monster data function
const getMonsterData=async(limit, offset)=>{
    try{
    const response=await fetch(`http://localhost:3000/monsters?_limit=${limit}&_offset=${offset}`)
    if(response.status != 200){
        throw new Error("data is not found");
    }
    const data=await response.json()
    return data
}
    catch(e){
        console.log(e);
    }
}

// create monster function
const postMonsterData=async(body)=>{
    // create post options
    let options={
        method:"POST",
        headers:{
            "Content-type":"application/json",
            Accept: "application/json"
        },
        body:JSON.stringify(body)
    }

    // post data
    try{
    const response=await fetch(`http://localhost:3000/monsters`, options)
    if(response.status != 200){
        throw new Error("data is invalid");
    }
    const data=await response.json()
    return data
}
    catch(e){
        console.log(e);
    }
}