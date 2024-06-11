let form=document.querySelector("form")
let resultDiv=document.querySelector(".result")

form.addEventListener("submit",(e)=>{
     e.preventDefault()

     getWordInfo(form.elements[0].value)
})

const getWordInfo=async(word)=>{
     try {
          
     // alert("word" + word)
resultDiv.innerHTML="Featching Data..."

     const response=await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
     const data=await response.json();
     console.log(data);

let definitiondata=data[0].meanings[0].definitions[0]

 resultDiv.innerHTML=`
 <h2><strong>word:</strong> ${data[0].word}</h2>
 <p class="partsofSpeech">${data[0].meanings[0].partOfSpeech}</p>
 <p><strong>Meaning :</strong>${definitiondata.definition ===undefined ? "Not Found" : definitiondata.definition}</p>
 <p><strong>Example :</strong>${definitiondata.example  ===undefined ? "Not Found" : definitiondata.example}</p>
 <p><strong>Antonyms :</strong></p>
 `

 //Fetching Antonyms
 if (definitiondata.antonyms.length===0) {
     resultDiv.innerHTML += `<span>"Not Found"</span>`
 }else{
     for (let i = 0; i < definitiondata.antonyms.length; i++) {
          resultDiv.innerHTML +=`<li> ${definitiondata.antonyms[i]}</li>` 
 }
 
 }

 //Adding read more Button
 resultDiv.innerHTML +=`<div><a href="${data[0].sourceUrls}" target="_blank">Read More</a></div>`

} catch (error) {
     resultDiv.innerHTML=`<h3>Sorry, This word could not be found</h3>`     
}
}