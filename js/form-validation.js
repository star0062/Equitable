document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    
    function showError(inputId, message) {
        const errorElement = document.getElementById(inputId + '-error');
        errorElement.textContent = message;
        errorElement.classList.add('active');
        document.getElementById(inputId).setAttribute('aria-invalid', 'true');
    }
    
    function clearError(inputId) {
        const errorElement = document.getElementById(inputId + '-error');
        errorElement.textContent = '';
        errorElement.classList.remove('active');
        document.getElementById(inputId).removeAttribute('aria-invalid');
    }
    
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        let isValid = true;
        
      
        const name = document.getElementById('name');
        if (!name.value.trim()) {
            showError('name', 'Veuillez entrer votre nom.');
            isValid = false;
        } else {
            clearError('name');
        }
        
        const email = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            showError('email', 'Veuillez entrer votre adresse email.');
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            showError('email', 'Veuillez entrer une adresse email valide (exemple: nom@domaine.com).');
            isValid = false;
        } else {
            clearError('email');
        }
        
        const phone = document.getElementById('phone');
        const phoneRegex = /^[0-9]{10}$/;
        if (phone.value.trim() && !phoneRegex.test(phone.value)) {
            showError('phone', 'Veuillez entrer un numéro de téléphone valide (10 chiffres sans espaces).');
            isValid = false;
        } else {
            clearError('phone');
        }
        
        const subject = document.getElementById('subject');
        if (subject.value === '' || subject.selectedIndex === 0) {
            showError('subject', 'Veuillez sélectionner un sujet.');
            isValid = false;
        } else {
            clearError('subject');
        }
        
        const message = document.getElementById('message');
        if (!message.value.trim()) {
            showError('message', 'Veuillez entrer votre message.');
            isValid = false;
        } else if (message.value.trim().length < 10) {
            showError('message', 'Votre message doit contenir au moins 10 caractères.');
            isValid = false;
        } else {
            clearError('message');
        }
        
        const consent = document.getElementById('consent');
        if (!consent.checked) {
            showError('consent', 'Vous devez accepter le traitement de vos données pour envoyer le formulaire.');
            isValid = false;
        } else {
            clearError('consent');
        }
        
        if (isValid) {
        
            document.getElementById('form-error').hidden = true;
            
            
            setTimeout(function() {
                document.getElementById('form-success').hidden = false;
            
                form.reset();
              
                setTimeout(function() {
                    document.getElementById('form-success').hidden = true;
                }, 5000);
            }, 1000);
        } else {
            // Focus sur le premier champ en erreur
            form.querySelector('[aria-invalid="true"]').focus();
        }
    });
    
    
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(function(input) {
        input.addEventListener('blur', function() {
            
            switch(input.id) {
                case 'name':
                    if (!input.value.trim()) {
                        showError('name', 'Veuillez entrer votre nom.');
                    } else {
                        clearError('name');
                    }
                    break;
                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!input.value.trim()) {
                        showError('email', 'Veuillez entrer votre adresse email.');
                    } else if (!emailRegex.test(input.value)) {
                        showError('email', 'Veuillez entrer une adresse email valide (exemple: nom@domaine.com).');
                    } else {
                        clearError('email');
                    }
                    break;
                case 'phone':
                    const phoneRegex = /^[0-9]{10}$/;
                    if (input.value.trim() && !phoneRegex.test(input.value)) {
                        showError('phone', 'Veuillez entrer un numéro de téléphone valide (10 chiffres sans espaces).');
                    } else {
                        clearError('phone');
                    }
                    break;
                case 'subject':
                    if (input.value === '' || input.selectedIndex === 0) {
                        showError('subject', 'Veuillez sélectionner un sujet.');
                    } else {
                        clearError('subject');
                    }
                    break;
                case 'message':
                    if (!input.value.trim()) {
                        showError('message', 'Veuillez entrer votre message.');
                    } else if (input.value.trim().length < 10) {
                        showError('message', 'Votre message doit contenir au moins 10 caractères.');
                    } else {
                        clearError('message');
                    }
                    break;
                case 'consent':
                    if (!input.checked) {
                        showError('consent', 'Vous devez accepter le traitement de vos données pour envoyer le formulaire.');
                    } else {
                        clearError('consent');
                    }
                    break;
            }
        });
    });
});
