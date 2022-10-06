# inFormation Contact Updater App
A single-page application to help users keep their contact information up to date. 

## Description
When contacts get new email addresses or phone numbers, they sometimes find it difficult to update everyone who needs to know. This app is aimed at solving that problem.

Users can construct Formations: collections of contacts who share information with the user and with whom the user shares information. When the user updates their information, everyone in the Formation can see the new information and when a contact updates their information, the user can see that, too.

The project is currently in beta and I'd appreciate any feedback!

## Demo
[![A link to a demo video](https://timloughrist.files.wordpress.com/2022/10/information.png)](https://youtu.be/J-0qIAHsd7g)

Click the image above to watch a video demonstrating the app.

## Installation
The current version of the app simulates a server for storing user information using [JSON-server](https://www.npmjs.com/package/json-server).

To install JSON-server, navigate in terminal to the directory where you've cloned this repository and run:
```
npm install -g json-server
```
To start the server, run:
```
json-server --watch db.json
```
I hope to deploy the app using [Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs) soon.

## Usage

**Signup:** Create an account with a unique username and a password. Don't worry: if your username is already taken, the app will let you know.

**Login:** If you already have an account, login using your username and password. Once you're logged in, you will stay logged in until you logout or close the app's tab.

**Update Personal Information:** Begin by entering your contact information and linking to a user picture. Don't worry: other uses will only be able to see the information you decide to share with them. Customizing who sees what information is a key feature of the app.

**Create a New Formation:** Click on "Formations" in the navigation bar. You don't have any Formations yet, so click on "New Formation" and create your first Formation: give it a name, an associated image, and a color theme. Then decide which pieces of information you want to share with this Formation.

**Invite Users to Join Your Formation:** Now you have a Formation but there isn't anyone in it yet. Click on "Users" to see who you can invite into your Formation. Once you've found someone who you'd like to connect with, pick the Formation you'd like them to join from the drop-down menu and send the invitation.

**Request to Join Formations:** While you're on the Users page, if you see someone who has a Formation you'd like to join, send them a request.

**Accept/Reject Invitations and Requests:**  By clicking on "Invitations" or "Requests" you can see who wants you to join their Formations and who wants to join your formations. You can accept or reject invitations and requests. In the case of invitations, you decide which pieces of information you'd like to share with the Formation.

**View Users/Owners:**  Click on "My Formations" to see the Formations you belong to. For the Formations you own, you can see all the users in the Formation (but they can't see each other). For Formations you don't own, you can see the owner of the Formation. In either case, you'll see all the information they've decided to share with the Formation.

**Remove Users:**  If, for some reason, you want to remove a user from a Formation, it can easily be accomplished by clicking on "Remove User" under their contact information.

**Update Shared Information:**  By clicking on "Shared Information" on any of the Formations you belong to, you can change which pieces of information to share. The shared information updates as soon as you click on the radio button.

**Change Formation Settings:**  For Formations you own, you can change the settings, including the Formation's name, image, and color. You can also delete the Formation from the settings page.

**Leave a Formation:**  For Formations you don't own, you can easily leave the Formation by clicking on "Leave Formation" on the Formation card.

**Logout:**  By clicking on "Logout" you can immediately terminate your session.

## Support
If you have any questions about the app or suggestions, please send me an email at tim.loughrist@gmail.com.

## Roadmap
In the future, I'd like to add the following features:

1. Delete account.
2. Search for users.
3. Import contacts.
4. Notify users of changes to Formations, e.g., when a user updates their information.
5. Notify users of invitations and requests.
6. Allow users to add custom information fields.

## Contributing
If anyone wants to fork this repo and work on the app, I'd love to see what you do with it!

## Authors and acknowledgment
I've been lucky to have the help of instructors at the [Flatiron coding bootcamp](https://flatironschool.com/welcome-to-flatiron-school/?utm_source=Google&utm_medium=ppc&utm_campaign=12728169833&utm_content=127574232664&utm_term=flatiron&uqaid=513747011248&CjwKCAjwsMGYBhAEEiwAGUXJafADpgJFbJ4--7MTNBIDgpVzlW_ojAyku7GlAFULzRS0BW5RBpdGFBoCjNEQAvD_BwE&gclid=CjwKCAjwsMGYBhAEEiwAGUXJafADpgJFbJ4--7MTNBIDgpVzlW_ojAyku7GlAFULzRS0BW5RBpdGFBoCjNEQAvD_BwE). I've also benefited greatly from running code past my friend, [Patrick Lindsay](https://www.linkedin.com/in/thomaspatricklindsay/). Much love to my spouse, Katie, who had the idea for this app in the first place!