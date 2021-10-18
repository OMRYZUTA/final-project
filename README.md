# Final Project
## Marshmallow. managing your job hunt.
A web application and chrome extension to manage your job hunt.
![](RackMultipart20211018-4-1xy4qa2_html_51289b050488c5e.png)

We&#39;re proud of our project and the great progress we made with it. We&#39;d like to draw your attention to a few observations and code-bits we find to be especially interesting:

Back-End

- Initially, we sketched-out the classes, and had a pretty good picture in our heads of how things should look. But later on, we were in unknown territory for us, trying to figure out the models when working with a database, and we realised the initial classes would need some modifications.
 The **relationships between models,** especially Many-to-One, something that may seem trivial to experienced developers, were counter-intuitive to us and required some extra digging and effort to overcome.
- Serializers.py: Marshmallow - final project\BackEnd\api
It took us a while to figure out how to work with serializers and the most complicated of these was the **ApplicationProcessSerializer**.
 We knew that we wanted to send the ApplicationProcess as a single payload from the front-end, and its nested objects made its serialization more complicated.
 Because of the hierarchical nature of the ApplicationProcess model, we couldn&#39;t use default create and update methods of ApplicationProcessSerializer and had to override them.


Front-End

- Background.js: Marshmallow - final project\Extension
**Marshmallow Chrome Extension** - this was our first experience working with extensions. Scraping LinkedIn and Indeed proved to be quite difficult and also figuring out how to message between the scripts.
- **ApplicationProcessDialog.js** :\Marshmallow - final project\FrontEnd\pages\Home
This is the heart of our front-end. It&#39;s the rendering of our main model, ApplicationProcess. The same hierarchy of the model that required our attention in the back-end, required special care in the front-end, handling all the updates or additions of nested-objects within it.
- **EnhancedTable.js** : Marshmallow - final project\FrontEnd\pages\Home
The landing page of our application and the gateway to the back-end (via AppProcServices.js, and the StaticServices.js).
- On top of the logic, this was our first time working on an intricate design and thinking of the layout from a ux point of view. Even though we used Material-UI components, we quickly found out there are no &quot;free-meals&quot; and there was quite a learning curve to work with these components, each of which we needed to tweak and adjust to fit our needs..
 As an anecdote - we knew early on we wanted different button-colors for past-steps and future-steps, it seems like a small matter, but it took us several hours and a lot of googling to do,


**Links**

- Deployed Marshmallow: [http://zulimarshmallow.azurewebsites.net/](http://zulimarshmallow.azurewebsites.net/)
- A recorded demo [https://www.youtube.com/watch?v=gNOBMoup\_hY](https://www.youtube.com/watch?v=gNOBMoup_hY)
- Marshmallow code on github: [https://github.com/OMRYZUTA/final-project](https://github.com/OMRYZUTA/final-project)
