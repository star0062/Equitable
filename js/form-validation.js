/**
 * Script de validation du formulaire de contact
 * Ce script gère la validation en temps réel et à la soumission du formulaire
 */

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact-form');
    
    // Fonction pour afficher les messages d'erreur
    function showError(inputId, message) {
        const errorElement = document.getElementById(inputId + '-error');
        errorElement.textContent = message;
        errorElement.classList.add('active');
        document.getElementById(inputId).setAttribute('aria-invalid', 'true');
    }
    
    // Fonction pour effacer les messages d'erreur
    function clearError(inputId) {
        const errorElement = document.getElementById(inputId + '-error');
        errorElement.textContent = '';
        errorElement.classList.remove('active');
        document.getElementById(inputId).removeAttribute('aria-invalid');
    }
    
    // Validation à la soumission du formulaire
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        let isValid = true;
        
        // Validation du nom
        const name = document.getElementById('name');
        if (!name.value.trim()) {
            showError('name', 'Veuillez entrer votre nom.');
            isValid = false;
        } else {
            clearError('name');
        }
        
        // Validation de l'email
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
        
        // Validation du téléphone (optionnel mais doit être au bon format si renseigné)
        const phone = document.getElementById('phone');
        const phoneRegex = /^[0-9]{10}$/;
        if (phone.value.trim() && !phoneRegex.test(phone.value)) {
            showError('phone', 'Veuillez entrer un numéro de téléphone valide (10 chiffres sans espaces).');
            isValid = false;
        } else {
            clearError('phone');
        }
        
        // Validation du sujet
        const subject = document.getElementById('subject');
        if (subject.value === '' || subject.selectedIndex === 0) {
            showError('subject', 'Veuillez sélectionner un sujet.');
            isValid = false;
        } else {
            clearError('subject');
        }
        
        // Validation du message
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
        
        // Validation du consentement
        const consent = document.getElementById('consent');
        if (!consent.checked) {
            showError('consent', 'Vous devez accepter le traitement de vos données pour envoyer le formulaire.');
            isValid = false;
        } else {
            clearError('consent');
        }
        
        // Si le formulaire est valide, simuler l'envoi et afficher le message de succès
        if (isValid) {
            // Cacher les messages d'erreur
            document.getElementById('form-error').hidden = true;
            
            // Simuler un envoi (à remplacer par un vrai envoi AJAX)
            setTimeout(function() {
                // Afficher le message de succès
                document.getElementById('form-success').hidden = false;
                
                // Réinitialiser le formulaire
                form.reset();
                
                // Cacher le message de succès après 5 secondes
                setTimeout(function() {
                    document.getElementById('form-success').hidden = true;
                }, 5000);
            }, 1000);
        } else {
            // Focus sur le premier champ en erreur
            form.querySelector('[aria-invalid="true"]').focus();
        }
    });
    
    // Validation en temps réel pour chaque champ
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(function(input) {
        input.addEventListener('blur', function() {
            // Validation spécifique pour chaque type de champ
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
