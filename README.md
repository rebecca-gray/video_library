# video_library

* Create a RESTful API in NodeJS that is accessible via curl/postman/whatever. 
* Make it so I need to signup and get a Bearer token before I can use any endpoints via a Users/Tokens schema. Extra credit: use passport/JWT!
* Make a Videos schema that gives info about a video (title, description, author, date, duration, source). AllowNull is fine sometimes.
* Details about the video should use ffmpeg/ffprobe.
* Have an association that tells us what type of file extension the video has.
* Have an association that tells us the aspect ratio of the video.
* Have an association that stores other data from ffprobe, e.g., Metadata.
* Use Sequelize for the associations.
* Have a GET endpoint that lists videos, grouped by 5 so I have to paginate.
* Have a GET endpoint that gives me a video by uuid, showing all the info about that video, including Metadata.
* Have a GET endpoint so I can see videos with a certain aspect ratio.
* Hydrate the db with some decent videos so I can see some data.
* Document the API using Swagger/OpenAPI.
* Make the API and Swagger available via the web and github so we can see it!
* Make sure there are some integration tests!
