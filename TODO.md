# TODO

## Database

- [ ] Schéma bd
- [ ] Sql création db
- [ ] Route init bd avec admin par défaut (admin/admin)

## App

- [ ] Forums → sujets → messages
- [ ] Sujet avec message initial
- [ ] Créer un sujet → doit être connecté
- [ ] Créer un message → doit être connecté
- [ ] Niveau admin et utilisateur
- [ ] Actualisation en temps réel de la liste des sujets d'un forum (le sujet remonte dans la liste) lorsqu'un message est posté dans un sujet ou qu'un nouveau sujet est créé
- [ ] Si je suis dans un sujet et qu'un nouveau message est posté, il doit apparaître directement

## Page d'accueil

- [ ] Explorer les sujets → non connecté
- [ ] Bouton de déconnexion
- [ ] Changement de mot de passe
- [ ] Accueil → lister les forums (avec nbr sujets)

## Page de forum

- [ ] Page de forum → lister les sujets (sujet plus récemment répondu en premier): auteur du sujet, date et auteur du dernier message
- [ ] Page de forum → bouton "nouveau sujet" : saisir titre et message du sujet (uniquement si utilisateur connecté, sinon petit message invitant à se connecter)
- [ ] Sujets paginés à 20 par page

## Page de sujet

- [ ] Page de sujet → lister les messages (plus vieux en premier, récent en dernier)
- [ ] Bouton répondre (uniquement si connecté)
- [ ] Message indique : nom utilisateur, date, message
- [ ] Messages paginés à 20 par page
- [ ] Utilisateur peut modifier ses messages via un bouton
- [ ] Admin peut modifier/supprimer n'importe quel message via un bouton
- [ ] Admin peut supprimer un sujet (et tous ses messages) via un bouton

## Espace admin

- [ ] Créer un nouveau compte admin
- [ ] Créer, renommer, supprimer un forum
- [ ] Supprimer un forum supprime tous ses sujets et messages

## Bonus

- [ ] Citer un message (recopie le message cité au-dessus du message actuel)
- [ ] Avatar utilisateur, affiché devant chaque message (gérer l'upload)
- [ ] Verrouiller un sujet (uniquement les admins)
- [ ] Afficher l'état lu/non-lu de chaque sujet et message pour l'utilisateur connecté
