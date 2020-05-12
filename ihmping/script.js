function ping(delay,address = "ping.zenetys.com"){
  if (typeof delay === 'undefined'){
    delay = 1000; //Valeur par défaut du délai si non entré par l'utilisateur
  }
    
    let times = 0;
    let average = 0;
    let interval = setInterval(()=>{  //Déclaration d'un interval afin de répéter l'action toutes les X millisecondes
    let timePing = $.now(); //On déclare une variable contenant le temps en ms avant l'envoi de la requête
    
       $.ajax({ //Requête AJAX au serveur
       url : "https://"+address,
       type : 'HEAD',
       cache : false,
       error : () => {
         let checkPing = document.createElement('div');
         checkPing.textContent = 'Erreur, impossible d\'atteindre le serveur';
         checkPing.className="displayPing bPing";
         document.querySelector('#displayPing').prepend(checkPing);
         clearInterval(interval);
       } , 
       success : () => {
         timePing = $.now() - timePing; //Différence entre le temps avant la requête et celle apres avoir envoyé la requête
         average += (timePing / times) - (average/times);
         console.log("Moyenne : " + average);
         console.log(timePing);
         
         let checkPing = document.createElement('div');
         if (timePing < 70){
           checkPing.textContent = "#"+times + " " + timePing + " ms, ping correct";
           checkPing.className = "displayPing gPing";
         }
         else if(timePing > 70 && timePing < 200){
           checkPing.textContent = "#"+times + " " +timePing + " ms, ping moyen";
           checkPing.className = "displayPing aPing";
         }
         else if(timePing > 200){
           checkPing.textContent = "#" + times + " Requête perdue";
           checkPing.className = "displayPing bPing";
         }
         document.querySelector('#displayPing').prepend(checkPing);
       }
          });
       
       times++;
      
      //On limite à 4 pings
      if (times >= 4){
      clearInterval(interval);
      console.log(average);
      $('#ping_label').text(average);  
      console.log("Fin du ping");
    }
    
    },delay);}

$('#formulaire').submit((e) => {
  e.preventDefault();
  let adresseValue = $('#adresse').val();
  let delaisValue = $('#delai').val();
  
  if(isNaN(parseInt(delaisValue))== false || delaisValue === "")
    {
  //Conditions en fonction des entrées dans les input
      if (delaisValue === "" && adresseValue === ""){
        ping();
      }
      if(delaisValue === "" && adresseValue != ""){
        ping(1000,adresseValue);
      }
      else if(delaisValue != "" && adresseValue === ""){
        ping(Number(delaisValue));
      }
      else if(delaisValue != "" && adresseValue != ""){
        ping(Number(delaisValue),adresseValue);
      }
    } 
  else{alert('Erreur');}
});