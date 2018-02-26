This is my solution for the TopCoder Watson Fun Challenge
https://cognitive.topcoder.com/challenges/30062681

In this challenge we want you to create a simple app that pulls the latest posts from Topcoder Blog and uses Watson Personality Insights service to learn about personality of their authors.

To get posts from our lovely blog you can GET its RSS feed from
https://www.topcoder.com/blog/feed/, after parsing the XML, say with help of xml2json, you’ll pass their content through the Personality Insights service and display the results to the user. For the purpose of this challenge, it is enough to create a simple NodeJS script, that does the job and outputs the results into a local file.

#Demo Video
https://youtu.be/rNQYWRB5d3Y