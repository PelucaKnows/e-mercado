    const name1 = document.getElementById("name1")
    const surname1 = document.getElementById("surname1")
    const email = document.getElementById("emailProfile")
    const error2 = document.getElementById("alert-error");


function saveProfileInfo(){
    

     myProfileData = {"fields": []};
     infoPerfilModal = document.getElementsByClassName("form-control");
    if(name1.value !== "" && surname1.value !== "" && email.value !== ""){
    
    myProfileData.fields.push( {name1 : infoPerfilModal[0].value} );
    myProfileData.fields.push( {name2  :  infoPerfilModal[1].value} ); 
    myProfileData.fields.push( {surname1 :  infoPerfilModal[2].value} ); 
    myProfileData.fields.push( {surname2  :  infoPerfilModal[3].value} );
    myProfileData.fields.push( {emailProfile : infoPerfilModal[4].value} );
    myProfileData.fields.push( {contact  :  infoPerfilModal[5].value} );

    localStorage.setItem("profileObject", JSON.stringify(myProfileData));
    
    printData();
}else{
   
   document.getElementById("alert-error").className += "alert alert-danger show";
}
}


function printData(){

    if(localStorage.getItem("profileObject") !== null){
        dataProfileFields = JSON.parse(localStorage.getItem("profileObject"));
        profileData = document.getElementsByClassName("form-control");
       
        profileData[0].value = dataProfileFields.fields[0].name1;
       profileData[1].value = dataProfileFields.fields[1].name2;
       profileData[2].value = dataProfileFields.fields[2].surname1;
       profileData[3].value = dataProfileFields.fields[3].surname2;
       profileData[4].value = dataProfileFields.fields[4].emailProfile;
       profileData[5].value = dataProfileFields.fields[5].contact;
       

    }else{
        alert(haocurridounerror)
    }
}

document.addEventListener("DOMContentLoaded", function (e){
    document.getElementById("emailProfile").value = sessionStorage.getItem("user");
    printData();
   
})








