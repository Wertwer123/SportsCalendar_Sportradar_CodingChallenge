# SportsCalendar_Sportradar_CodingChallenge
My calendar has the ability to display sport events that are saved inside of the databse.
I locally hosted everything with xampp on a my sql database with php my admin.
I also used node.js to build the project

Setup steps :

1.) install xampp or any other tool locally host a server
2.) start apache and my sql
3.) and on php my admin import the database structure with the attached sql file
4.) open a terminal
5.) run the command npm run start
6.) click the link in the terminal
7.) the website should now open 

you can select a date filter to filter all the events by a specific month and year the table of displayed sport events will automatically refresh
you can also add a template event to the database by clicking the add event button.
you can also remove a specified event by clicking the x button on the very right side 

Decission during development

I also needed to decide how I would retrieve data from the database I decided to create a Rest API for that with express.js, as this provided a easy to use extendable and 
relatively straight forward way to code calls to the database.  

First I layed out on a paper which entities I need for the database and how I would like them to be displayed on the website and how to maximize UX.
I decided to split my site and project files into a backend part and a front end part.
Front end is only responsible to display things retrieved from the backend so no backend functionality 
is tied to the frontend.

Then I pseudo coded everything starting with comments of how the functions would look and what purpose the will fullfill and afterwards implemented it.

I also had to think about how I would handle errors I decided on sending just appropiate error codes for when a call to the database fails if given more time Id also implement messages for the user for when something failed to increase user experience.

As this was the first time I have really dived into webdevelopment and also using my sql it proposed a challenge by which I was intrigued and excited.
But I managed it very quickly to get a hang of it and enjoyed it to learn new things whilst doing this challenge.