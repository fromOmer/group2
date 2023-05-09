# Project_WEB_part_B
Part B of the project of web course

**FLOW Studio Website and App:**

To create our web application, we designed several HTML pages with specific characteristics, including a Cover Page, Registration Page, Website Login Page, Weekly Training Schedule Page, Training Registration Page, Training Review Writing Page, Information Page about Our Coaches, Information Page about Our Trainings, Contact Page, and Personal Area Page. To maintain consistency throughout the website, we included a footer and a navigation bar on all pages. Additionally, we added a top and bottom bar to each page, allowing users to easily navigate through the website and find important information.

To maintain best practices, we connected some pages to the same CSS. We also implemented responsive design on our website, using CSS pages to ensure that our top and bottom bars adjust to the size of the screen. For example, when the page is reduced, the top bar changes from a regular bar to an animation of a hamburger. Similarly, the bottom bar adjusts the font size and removes the map image and icons when the page is reduced.

To add flexibility to the layout of our pages, we used the Flex layout when we needed to add text and images next to each other or a row of images. Additionally, we added CSS animations to the top bar to make it more dynamic.

To implement dynamic functionality on our website, we created a JSON file to store data and allow us to extract data to our pages dynamically. We made the HTML pages for Training and Coaches dynamic by creating them when the page is running dynamically. This allows the text to be changed easily. We also pulled user values in Contact, Registration, and Review pages.

To ensure that we collect valid inputs from the user, we implemented validation on the Sign In and Sign Up forms. For example, we checked that the inputs matched our current JSON source and compared them to regex segments to ensure that the values entered are legal.

Overall, we designed our web application with accessibility and convenience in mind, ensuring that our design is relatively simple and user-friendly for all ages of users, including older clients.