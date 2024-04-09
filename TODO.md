# TODO

## Database

- [X] Schéma bd
- [X] Sql création db
- [X] Route init bd avec admin par défaut (admin/admin)
- [X] Appel automatique route création bd page index

## App

- [X] Forums → sujets → messages
- [X] Sujet avec message initial
- [X] Créer un sujet → doit être connecté
- [X] Créer un message → doit être connecté
- [X] Niveau admin et utilisateur
- [ ] Actualisation en temps réel de la liste des sujets d'un forum (le sujet remonte dans la liste) lorsqu'un message est posté dans un sujet ou qu'un nouveau sujet est créé
- [ ] Si je suis dans un sujet et qu'un nouveau message est posté, il doit apparaître directement

## Page d'accueil

- [X] Explorer les sujets → non connecté
- [X] Bouton de déconnexion
- [X] Changement de mot de passe
- [X] Accueil → lister les forums (avec nbr sujets)

## Page de forum

- [X] Page de forum → lister les sujets (sujet plus récemment répondu en premier): auteur du sujet, date et auteur du dernier message
- [X] Page de forum → bouton "nouveau sujet" : saisir titre et message du sujet (uniquement si utilisateur connecté, sinon petit message invitant à se connecter)
- [ ] Sujets paginés à 20 par page

## Page de sujet

- [X] Page de sujet → lister les messages (plus vieux en premier, récent en dernier)
- [X] Bouton répondre (uniquement si connecté)
- [X] Message indique : nom utilisateur, date, message
- [ ] Messages paginés à 20 par page
- [X] Utilisateur peut modifier ses messages via un bouton
- [X] Admin peut modifier/supprimer n'importe quel message via un bouton
- [X] Admin peut supprimer un sujet (et tous ses messages) via un bouton

## Espace admin

- [X] Créer un nouveau compte admin
- [X] Créer, renommer, supprimer un forum
- [X] Supprimer un forum supprime tous ses sujets et messages

## Bonus

- [ ] Citer un message (recopie le message cité au-dessus du message actuel)
- [ ] Avatar utilisateur, affiché devant chaque message (gérer l'upload)
- [ ] Verrouiller un sujet (uniquement les admins)
- [ ] Afficher l'état lu/non-lu de chaque sujet et message pour l'utilisateur connecté
