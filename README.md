## The Guardian News Assessment

#### Level 1
Create a web app that shows a list of 10 last news from The Guardian
API.
##### Requirements
1. the page should contain a list of 10 last news;
2. each list item should only include a title;
3. news should be requested from The Guardian API on page load
by using AJAX;
4. if an error occurs during a request, a message should be shown.

#### Level 2
Add refresh button on top of the news list.
##### Requirements
1. the page should contain a refresh button before the news list;
2. on a user clicks the refresh button, a new data should be
requested from The Guardian API.

#### Level 3
Add "accordion" with a short text of the news and a link to the article.
##### Requirements
1. the page should contain an accordion with news title;
2. on a user clicks a title, a data should be requested from The
Guardian API about clicked news;
3. when data arrives, a short text of the news and a link to the full
article should be displayed in the block under the title;
4. on a user clicks a title of already opened news, the content
should be hidden;
5. icons for opened and closed news should be different;
6. an animation should be used for a slide down / slide up effect.

#### Level 4
Add pagination block.
##### Requirements
1. under the news list there should be a block with pagination that
contains:
1) "< Previous Page" button;
2) an indicator of a current page: "[2] of 12421 pages", where
the number of current a page is an input field;
3) "Next Page >" button;
2. when a user is on the first page, the "< Previous Page" button
should be disabled;
3. when a user is on the last page, the "Next Page >" button
should be disabled;
4. when a user clicks to the "< Previous Page" button, a news of
previous page should be loaded;
5. when a user clicks to the "Next Page >" button, a news of next
page should be loaded;
6. the indicator of a current page should show correct total pages
number and current page number;
7. when a user changed a current page number in the input and if
the entered page exists, than entered page should be loaded.
