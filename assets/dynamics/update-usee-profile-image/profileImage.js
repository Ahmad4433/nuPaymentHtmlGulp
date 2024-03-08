function updateProfil(){

const selectedInputFile = document.querySelector('.update-profile-image')
const selectedBtn = document.querySelector('.user-update-profile-container')
const image = document.querySelector('.user-update-profile-view')

selectedBtn.addEventListener('click',function(){
    selectedInputFile.click()   
        selectedInputFile.addEventListener('change',function(event){
            image.style.display='block'
         const file = event.target.files[0]
               if(file){
            const reader = new FileReader()
            reader.onload = (event)=>{
                image.src = event.target.result

                
            }
            reader.readAsDataURL(file);
        
         }else{
            image.src=''
         }
       

    })

   


})



}

updateProfil()




