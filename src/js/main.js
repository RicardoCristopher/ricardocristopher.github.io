//----------------------------------------------------------------------
// Global Const
//----------------------------------------------------------------------

	const aside = document.querySelector('aside');
	const nav   = aside.querySelector('nav');
	const main  = document.querySelector('main');
	const ajaxD = main.querySelector('#mainer');

// ----------------------------------------------------------------------
//  Global Tools
// ----------------------------------------------------------------------
    
    //--------------------------------------------------------
    // Substitutes
    //--------------------------------------------------------

		function newAjax(){
            try{ 
                xmlhttp = new ActiveXObject("Msxml2.XMLHTTP"); 
            }
            catch(e){ 
                try { 
                    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); 
                } 
                catch(E) { 
                    xmlhttp = false; 
                }
            }

            if (!xmlhttp && typeof XMLHttpRequest != "undefined") { 
                xmlhttp = new XMLHttpRequest(); 
            }

            return xmlhttp; 
        }

        function ajaxGet(view,handlers){
            ajax = newAjax();
            ajax.open("GET", './view/'+view+'.html', true);
            ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            ajax.send();
            ajax.onreadystatechange = ()=>{   
                if (ajax.readyState == 4){
                    ajaxD.innerHTML = ajax.responseText;
                    handlers();
                }
            }
        }

        function alert(msg,type = 'success',stick = false,stayTime = 3000)
        {
            removeAlert();

            myToast = $().toastmessage('showToast', {
                text      : msg,
                sticky    : stick,
                position  : 'bottom-right', 
                type      : type,
                closeText : '',
                stayTime  : stayTime,
            });
        }

        function removeAlert()
        {
            var check = document.querySelector('.toast-item-wrapper');

            if(check){check.remove()}
        }


    //--------------------------------------------------------
    // Tools
    //--------------------------------------------------------

    	function handlerCleaner(callback = null,toClean = null){
            $(toClean).find('*').off();

            callback();
        }

        function loading(){
            ajaxD.innerHTML = '<div id="loader-wrapper"><div class="circle-border"><div class="circle-core"></div></div></div>';
        }

        function noCanDo(){
            ajaxD.innerHTML = '<div id="loader-wrapper"><i class="errorico fas fa-exclamation-triangle"></i></div>';
            alert('An error has occurred',error,false);
        }

        function imgCatalog(target){
			Array.from(target.querySelectorAll('img')).forEach((img)=>{
				parseInt(img.width) > parseInt(img.height) ? img.classList.add('landscape') : (img.width == img.height ? img.classList.add('square') : img.classList.add('portrait'));
			});
		}

		function maxLength(e){
            let inp = e.currentTarget;
            let ctr = document.getElementById('counter-'+inp.id);
            let act = inp.value.length;
            ctr.innerText = act;
        }

		function counterCreator(elemList){
            for (let i = 0; i < elemList.length; i++){
                let count = document.createElement('sub');
                count.classList.add('counter-wrapper','my-2');
                count.innerHTML = '<p>Max:(</p><p id="counter-'+elemList[i].id+'">0</p><p>/'+elemList[i].getAttribute('maxlength')+')</p>';
                elemList[i].insertAdjacentElement('afterend',count);
            }
        }

        function formCheck(form){
        	let input = form.querySelectorAll('input, select, textarea');
        	let error = 0;

        	for (let i = 0; i < input.length; i++) {
        		if((input[i].value == '') || (input[i].value.length < 1)){
        			input[i].classList.add('is-invalid');
        			error++;
        		}else{
        			input[i].classList.remove('is-invalid');
        		}
        	}

        	if(error == 0){
        		//form.submit();

        		alert('Message Sent, Thank You','success',false);
        	}else{
        		alert('Incomplete Form','warning',false);
        	}
        }

// ----------------------------------------------------------------------
//                Href invokers and Listeners
// ----------------------------------------------------------------------
	
	//--------------------------------------------------------
    // Portfolio
    //--------------------------------------------------------

		function hrefPortfolio(){
            loading();

            try{
                handlerCleaner(toPortfolio,ajaxD);
            }catch(e){
                noCanDo(e);
                console.log(e);
            }

            function toPortfolio(){
                ajaxGet('portfolio',handlersPortfolio);
            }
        }

        function handlersPortfolio(){
        	createOrder();
        }

        function createOrder(){
			let place = ajaxD.querySelector('#portfolio');
			let art   = place.querySelectorAll('article');

			for (let i = 0; i < art.length; i++) {
				
				let target = place.querySelector('article:not([data-order])');

				if(target.classList.contains('skill-bar')){
					target.setAttribute('data-order',i);
					target.style.cssText = '--order:'+i;
					imgCatalog(target);

					let newTarget = place.querySelector('article.skill-bar:not([data-order])');

					if(newTarget){
						i = (i+1);
						newTarget.setAttribute('data-order',i);
						newTarget.style.cssText = '--order:'+i;
						imgCatalog(newTarget);
					}
				}else{
					target.setAttribute('data-order',i);
					target.style.cssText = '--order:'+i;
					imgCatalog(target);
				}
			}
		}

	
	//--------------------------------------------------------
    // Contact Me
    //--------------------------------------------------------
		
		function hrefContact(){
            loading();

            try{
                handlerCleaner(toContact,ajaxD);
            }catch(e){
                noCanDo(e);
                console.log(e);
            }

            function toContact(){
                ajaxGet('contact',handlersContact);
            }
        }

		function handlersContact(){
        	let maxL = ajaxD.querySelectorAll('.maxL');

			if(maxL){
	            counterCreator(maxL);

	            $(".maxL").on('input',()=>{
	                maxLength(event);
	            });
	        }

	        $('#submit').click((e)=>{
	        	formCheck(e.currentTarget.form);
	        });
        }

// ----------------------------------------------------------------------
//                       When Document Ready
// ----------------------------------------------------------------------

	$(document).ready(()=>{

		//--------------------------------------------------------
	    // First Page
	    //--------------------------------------------------------

	    	//hrefPortfolio();

		//--------------------------------------------------------
	    // href 
	    //--------------------------------------------------------

	    	$('.toPortfolio').click(()=>{
	    		hrefPortfolio()
	    	});

	    	$('.toContact').click(()=>{
	    		hrefContact()
	    	});
	});
		
