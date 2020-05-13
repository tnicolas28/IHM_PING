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
       crossDomain: true,
       beforeSend : (xhr) => {
         xhr.withCredentials = true;
       },
       error : () => {
         let checkPing = document.createElement('div');
         checkPing.innerHTML = 'Erreur, impossible d\'atteindre le serveur <i style = "float : right ;" class="fas fa-skull-crossbones pt-1"></i>' ;
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
           checkPing.innerHTML = "#"+times + " " + timePing + " ms, ping correct <i style = 'float : right;' class='far fa-smile-beam pt-1'></i>";
           checkPing.className = "displayPing gPing";
         }
         else if(timePing > 70 && timePing < 200){
           checkPing.innerHTML = "#"+times + " " +timePing + " ms, ping moyen <i style = 'float: right ;' class='far fa-meh pt-1'></i>";
           checkPing.className = "displayPing aPing";
         }
         else if(timePing > 200){
           checkPing.innerHTML = "#" + times + " <b>Requête perdue</b><i style = 'float : right;' class='far fa-angry pt-1'></i>";
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
      document.querySelector('#ping_label').innerHTML="<i class='far fa-clock'></i> " +  Math.round(average);  
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